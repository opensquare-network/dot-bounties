import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ksmPrecisionSelector } from "../../store/reducers/ksmSlice";
import { dotPrecisionSelector } from "../../store/reducers/dotSlice";
import { toPrecision } from "../../utils";

const ItemWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 5px 20px;
  text-align: right;
  
  label {
    color: rgba(0, 0, 0, 0.6);
  }
  
  p {
    margin-top: 7px;
    font-size: 24px;
    
    span {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.6);
      margin-left: 5px;
    }
  }
`

function Item({ title, unit, children }) {
  return (
    <ItemWrapper>
      <label>{title}</label>
      <p>
        {children}
        {
          unit ? <span>{unit}</span> : null
        }
      </p>
    </ItemWrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export default function Summary({ bounties, token }) {
  const total = bounties.length
  const active = bounties.filter(b => b.status === 'Active').length
  const totalValue = bounties.reduce((result, b) => {
    return result + b.detail.value
  }, 0)

  const isKsm = token === 'ksm'
  const precision = useSelector(isKsm ? ksmPrecisionSelector : dotPrecisionSelector)
  const unit = (token || '').toUpperCase()

  return (
    <Wrapper>
      <Item title='Total'>{total}</Item>
      <Item title='Active'>{active}</Item>
      <Item title='Total Value' unit={unit}>{toPrecision(totalValue, precision, false)}</Item>
    </Wrapper>
  )
}
