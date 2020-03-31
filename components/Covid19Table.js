import React, {Fragment} from 'react'
import TableHeading from './TableHeading'
import CompareRow from './CompareRow'
import {connect} from 'react-redux'


  function Covid19Table ({state}) {
     const rows = renderRows(state)
     
     return(
         <div className='table-container'>
            <table>
                <TableHeading />
                {rows}
            </table>
         </div>
    )
}

function renderRows(state) {
      return(
        <Fragment>
        <tr> {renderCountry(baseCountry)} </tr>
        <tr className='row-compare-country'> {state.compareCountry ? renderCountry(compareCountry) : <td> {state.error} </td> } </tr>
        {state.compareCountry && <CompareRow> renderComparism(state.baseCountry, state.compareCountry) </CompareRow> }
        </Fragment>
      )

}

function renderCountry(country){
    let cells = []
    for (let key in country){
        cells.push(<td> country[key] </td> )
    }
    return cells
}

export default function renderComparism(a,b){
    let cells = []
    for(let key in a){ // Since 'a' and 'b' are expected to have the same keys, I wont repeat for 'b'.
        let result = a[key] - b[key]
        let modifierClass = result > 0 ? 'higer' : 'lower' // is Nigeria higher than comparedCountry for the metric ? 
        let denominator = a[key] > b[key] ? a[key] : b[key]
        let percent = parseInt((Math.abs(result) / denominator) * 100) 
        cells.push(<td className={modifierClass}> {percent} % </td>)
    }
    return cells
}

const mapStateToProps = (state) => ({
state : state
})

// export default(mapStateToProps)(Covid19Table)