import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetIds.map((id) => (
                        <li key={id}>
                            <Tweet id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

// take in state of store (data needed here is tweets)
// returns an object that has a tweets id property on it
// sort tweets by timestamp
function mapStateToProps({ tweets }) {
    return {
        tweetIds: Object.keys(tweets)
            .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard) 