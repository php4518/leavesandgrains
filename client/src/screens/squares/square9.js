import React, { useEffect, useState } from "react";
import moment from 'moment';

const initialDate = moment('03/10/1968', 'DD/MM/YYYY')
const N = 29;
const delta = 100;
const markedValues = [115, 125, 128, 137, 143, 161];
const markedDates = ['04/10/68', '23/05/69', '22/08/69', '03/07/69', '31/07/70', '23/10/70', '18/09/70'];

const Square9 = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(matrix(N))
  }, [])

  const matrix = (n) => {
    const results = [];
    for (let i = 0; i < n; i++) {
      results.push([]);
    }
    let counter = n * n;
    let startColumn = 0;
    let endColumn = n - 1;
    let startRow = 0;
    let endRow = n - 1;
    while (startColumn <= endColumn && startRow <= endRow) {
      // Bottom row
      for (let i = startColumn; i <= endColumn; i++) {
        results[endRow][i] = counter;
        counter--; // 25, 24, 23, 22, 21
      }
      endRow--;

      // Right column
      for (let i = endRow; i >= startRow; i--) {
        results[i][endColumn] = counter;
        counter--; // 20, 19, 18, 17
      }
      endColumn--;

      // top row
      for (let i = endColumn; i >= startColumn; i--) {
        results[startRow][i] = counter;
        counter--; // 16, 15, 14, 13
      }
      startRow++;

      // start row = 1
      for (let i = startRow; i <= endRow; i++) {
        results[i][startColumn] = counter;
        counter--;
      }
      startColumn++;
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
                  background: (ci === ri || ci + ri === N - 1) ? 'lightgray' :
                    (ci === (N - 1) / 2 || ri === (N - 1) / 2) ? 'yellow' :
                      'white'
                }}>
                  <div style={{
                    background: markedDates.includes(day) ? 'pink' : 'transparent'
                  }}>{day}</div>
                  <div style={{
                    background: markedValues.includes(value) ? 'red' : 'transparent'
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

export default Square9;
