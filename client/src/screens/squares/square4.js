import React, { useEffect, useState } from "react";
import moment from 'moment';

const initialDate = moment('18/03/2020', 'DD/MM/YYYY')
const N = 21;
const delta = 0;
const highValues = [1477];
const lowValues = [510];
const markedDates = [];
// const markedValues = [510, 720, 986, 914, 1186, 1051, 1392, 1231, 1477, 1311];
// const markedDates = ['19/03/20', '30/04/20', '31/07/20', '04/09/20', '15/10/20', '02/11/20', '13/01/21', '29/01/21', '12/04/21', '14/05/21'];

const Square4 = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(matrix(N))
  }, [])

  const matrix = (n) => {
    const results = [];
    const totalCounts = n * 2;
    for (let i = 0; i < totalCounts; i++) {
      results.push([]);
    }
    let counter = totalCounts * totalCounts;

    let startRow = 0;
    let endRow = totalCounts - 1;

    let startColumn = totalCounts - 1;
    let endColumn = 0;

    while (startColumn >= endColumn) {
      for (let i = startRow; i <= endRow; i++) {
        if (i >= n) {
          results[i][startColumn] = counter;
          counter--;
        }
      }
      startColumn--;
      for (let i = startColumn; i >= endColumn; i--) {
        results[endRow][i] = counter;
        counter--;
      }
      endRow--;
      for (let i = endRow; i >= startRow; i--) {
        results[i][endColumn] = counter;
        counter--;
      }
      endColumn++;
      for (let i = endColumn; i <= startColumn; i++) {
        results[startRow][i] = counter;
        counter--;
      }
      startRow++;
      for (let i = startRow - 1; i <= endRow + 1; i++) {
        if (i < n) {
          results[i][startColumn + 1] = counter;
          counter--;
        }
      }
    }
    return results;
  };

  return (
    <div className="wrapper">
      {
        data.map((r, ri) => {
          return <div className="num-row">
            {
              r.map((c, ci) => {
                const value = c + delta;
                const day = moment(initialDate).add(c, 'day').format('DD/MM/YY');
                return <div className="num-column" style={{
                  flexDirection: 'column',
                  paddingHorizontal: 5,
                  background: (ci === ri || ci + ri === 2*N - 1) ? 'lightgray' : 'white'
                }}>
                  <div style={{
                    background: markedDates.includes(day) ? 'pink' : 'transparent'
                  }}>{day}</div>
                  <div style={{
                    color: 'white',
                    background: highValues.includes(value) ? 'green' : lowValues.includes(value) ? 'red' : 'transparent'
                  }}><b>{value}</b></div>
                </div>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default Square4;
