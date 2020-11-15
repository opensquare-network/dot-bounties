import React, { useState } from "react";
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import StateDescription from "./StateDescription";
import { states } from "./constants";

const StateWrapper = styled.section`
    background: #FFF;
    border: 1px solid #dbdbdb;
    font-size: 12px;
    display: flex;
    
    section.state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 64px;
      border-right: 1px solid #dbdbdb;
      width: 40%;
      
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &.active {
          span {
            border-color: #00C6B9;
          }
          
          i.high-light {
            color: #00C6B9; 
          }
        }
      }
      
      span {
        cursor: pointer;
        width: 120px;
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        
        &.selected {
          background: #EEE;
        }
      }
      
      i {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    }
    
    section.info {
      flex: 1;
      padding: 16px;
    }
`

export default function State({ bounty, token }) {
  const nowIndex = states.findIndex(s => s === bounty.status)

  const [state, setState] = useState(bounty.status)

  return (
    <StateWrapper>
      <section className="state">
        {
          states.map((iterState, index) => {
            return (
              <div key={index} className={index <= nowIndex ? 'active' : ''}>
                <span
                  className={iterState === state ? 'selected' : ''}
                  onClick={() => setState(iterState)}
                >{iterState}</span>
                {
                  index < states.length - 1 ?
                    <Icon
                      className={index < nowIndex ? 'high-light' : ''}
                      name='long arrow alternate down'
                    /> : null
                }
              </div>
            )
          })
        }
      </section>
      <section className="info">
        <StateDescription state={state} bounty={bounty} token={token} />
      </section>
    </StateWrapper>
  )
}
