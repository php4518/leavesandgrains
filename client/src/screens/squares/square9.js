import React, { useEffect, useState } from "react";
import moment from 'moment';

const initialDate = moment('4/9/2019', 'DD/MM/YYYY')
const timeFactor = 9.4575;
const N = 51;
const delta = 0;
const highValues = [1487, 823, 986]; // 12/04/2021
const lowValues = [511, 360, 430, 289]; // 23/3/2020
const markedDates = [];

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
                const day = moment(initialDate).subtract(c*timeFactor, 'hours').format('DD/MM/YY');
                return <div className="num-column" style={{
                  flexDirection: 'column',
                  paddingHorizontal: 5,
                  background:
                    (ri - ci === 4) ? 'pink' :
                    (ci === ri || ci - ri === N - 1) ? 'lightgray' :
                    (ci === (N - 1) / 2 || ri === (N - 1) / 2) ? 'yellow' :
                      'white'
                }}>
                  <div style={{
                    background: markedDates.includes(day) ? 'pink' : 'transparent'
                  }}>{day}</div>
                  {/* ci + ' - ' + ri */}
                  <div style={{
                    color: (highValues.includes(value) || lowValues.includes(value)) ? 'white' : 'black',
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

export default Square9;
