import type { NextApiRequest, NextApiResponse } from 'next'
import * as csv from 'csvjson-csv2json'
import Cors from 'cors'
import { Octokit } from "@octokit/rest";

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
})

const octokit = new Octokit

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    interface data {
        content: string
    }
    await runMiddleware(req, res, cors)
    await octokit.rest.repos.getContent({
        owner: 'scarnecchia',
        repo: 'oryx_data',
        path: 'totals_by_type.csv',
        
    })
    .then((data) => {
        const comsepval = atob((data.data as data).content)
        res.status(200).json(csv(comsepval))
    })
    
}