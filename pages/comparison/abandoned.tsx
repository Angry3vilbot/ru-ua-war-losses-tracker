import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LabelList, Label } from 'recharts'
import styles from '../../styles/Comparison.module.css'

interface LossData {
    country: string,
    equipment_type: string,
    destroyed: string | number,
    abandoned: string | number,
    captured: string | number,
    damaged: string | number,
    type_total: string | number,
    fill: string
}

export default function Comparison({ data }: { data: Array<LossData> }) {
    const russiaInfo = data.slice(0, Math.ceil(data.length / 2))
    const ukraineInfo = data.slice(Math.ceil(data.length / 2))

    function generateLossCharts(russia: Array<LossData>, ukraine: Array<LossData>) {
        let elementArray: Array<any> = []
    
        russia.forEach((val) => {
          if(val.equipment_type === 'Reconnaissance Unmanned Aerial Vehicles') {
            val.equipment_type = 'Unmanned Aerial Vehicles'
          }
          else if(val.equipment_type === 'Radars') {
            val.equipment_type = 'Radars And Communications Equipment'
          }
          val.fill = '#dc2626'
          // Parse the values to make them numbers, as Recharts does not work correctly with strings
          val.abandoned = parseInt(`${val.abandoned}`, 10)
          val.damaged = parseInt(`${val.damaged}`, 10)
          val.destroyed = parseInt(`${val.destroyed}`, 10)
          val.captured = parseInt(`${val.captured}`, 10)
          val.type_total = parseInt(`${val.type_total}`, 10)
        })
    
        ukraine.forEach((val) => {
          val.fill = '#0ea5e9'
          // Parse the values to make them numbers, as Recharts does not work correctly with strings
          val.abandoned = parseInt(`${val.abandoned}`, 10)
          val.damaged = parseInt(`${val.damaged}`, 10)
          val.destroyed = parseInt(`${val.destroyed}`, 10)
          val.captured = parseInt(`${val.captured}`, 10)
          val.type_total = parseInt(`${val.type_total}`, 10)
        })
    
        let unifiedArray = [...russia, ...ukraine ]
        unifiedArray.sort((a, b) => a.equipment_type > b.equipment_type ? 1 : -1)
    
        for(let i = 0; i <= unifiedArray.length / 2; i+=2) {
          const tempArray: Array<LossData> = [unifiedArray[i], unifiedArray[i+1]]
          elementArray.push(
            <ResponsiveContainer width="99%" aspect={1} key={i}>
            <BarChart 
            data={tempArray}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
              <CartesianGrid />
              <XAxis dataKey={"country"} style={{fill: 'white'}} />
              <YAxis style={{fill: 'white'}} >
                <Label value={tempArray[1].equipment_type} position={'top'} offset={-150} angle={-90} dx={-20} style={{fill: 'white'}} ></Label>
              </YAxis>
              <Tooltip />
              <Bar dataKey={"abandoned"}>
                <LabelList dataKey={"abandoned"} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          )
        }
    
        return elementArray
      }
    return (
        <section className={styles.chart_data}>
          <h1>Comparison of Ukrainian and Russian Abandoned Equipment by Type</h1>
          <div className={styles.chart_container}>
          {generateLossCharts(russiaInfo, ukraineInfo)}
          </div>
        </section>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/data')
    const data = await res.json()
    return {
      props: {
        data: data
      }
    }
}