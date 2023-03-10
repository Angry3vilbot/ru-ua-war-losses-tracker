import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

interface LossData {
  country: string,
  equipment_type: string,
  destroyed: string,
  abandoned: string,
  captured: string,
  damaged: string,
  type_total: string,
  fill: string
}

export default function Home({ data }: { data: Array<LossData> }) {
  const russiaInfo = data.slice(0, Math.ceil(data.length / 2))
  const ukraineInfo = data.slice(Math.ceil(data.length / 2))

  function generateLossText(data: LossData) {
    if(data.equipment_type === 'All Types') {
        return (
          <div className={styles.data_container} key={data.type_total}>
            <h2>{`Total Number of Equipment Lost`}: <span>{data.type_total}</span></h2>
            <h3>Out of which:</h3>
            <p>Destroyed: <span>{data.destroyed}</span></p>
            <p>Damaged: <span>{data.damaged}</span></p>
            <p>Captured: <span>{data.captured}</span></p>
            <p>Abandoned: <span>{data.abandoned}</span></p>
          </div>
        )
    }
    return (
      <div className={styles.data_container} key={data.type_total}>
        <h2>{`Total Number of ${data.equipment_type} Lost`}: <span>{data.type_total}</span></h2>
        <h3>Out of which:</h3>
        <p>Destroyed: <span>{data.destroyed}</span></p>
        <p>Damaged: <span>{data.damaged}</span></p>
        <p>Captured: <span>{data.captured}</span></p>
        <p>Abandoned: <span>{data.abandoned}</span></p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>War Losses Tracker</title>
        <meta name="description" content="A website for tracking losses in the RU-UA war by Angry3vilbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.main_heading}>Ukraine-Russia War Losses Tracker</h1>
        <section className="text-data">
          <h1 className={styles.secondary_heading}>Number of Russian Equipment Losses</h1>
          <div className={styles.loss_text_container}>
            {russiaInfo.map((obj) => {
              return (
                generateLossText(obj)
              )
            })}
          </div>
          <h1 className={styles.secondary_heading}>Number of Ukrainian Equipment Losses</h1>
          <div className={styles.loss_text_container}>
            {ukraineInfo.map((obj) => {
              return (
                generateLossText(obj)
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/data`)
  const data = await res.json()
  return {
    props: {
      data: data
    }
  }
}