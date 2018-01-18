import react from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from '../selectors/trades'
import { switchTab, requestTrades, setCurrentTicker } from '../actions/actions'
import Moment from 'react-moment'
import styles from '../styles/Orders'

class Trades extends react.Component {
  render () {
    const { trades, dispatch} = this.props

    const rows = trades.map((trade, i) => {
      return (
        <tr key={i} style={Object.assign(styles.alternateRow(i),styles.tr)}>
          <td onClick={() => setCurrentTicker(trade.symbol)}>{trade.pair}</td>
          <td>{trade.type}</td>
          <td><Moment format="DD-MM-YYYY">{trade.date}</Moment></td>
          <td>{trade.amount}</td>
          <td><strong>{trade.rate}</strong></td>
          <td>{trade.total.toPrecision(4)}</td>
          <td>{trade.exchange}</td>
        </tr>
      )
    }, this);

    return (
      <div className="col-xs-6 col-lg-7">
        <div style={styles.categoryHeader} className="row">
          <div className="col-xs-2" style={styles.categoryHeaderTabInactive} onClick={() => dispatch(switchTab({tab: 'Orders'})) }>Orders</div>
          <div className="col-xs-2" style={styles.categoryHeaderTab}>Trades</div>
        </div>
        <table style={styles.table}>
          <thead style={styles.tHead}>
            <tr>
              <th>Pair</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Total</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Trades);