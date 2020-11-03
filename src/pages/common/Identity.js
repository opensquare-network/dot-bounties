import React, { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.span`
  i {
    font-size: 12px;
    color: #00C6B9;
  }
  
  a {
    color: rgba(0, 0, 0, 0.87);
    &:hover {
      color: #00C6B9;
    }
  }
`;

export default function Identity({ api, addr, token = 'ksm' }) {
  const [identity, setIdentity] = useState(null)

  useEffect(() => {
    api.query.identity.identityOf(addr).then(identity => setIdentity(identity.toHuman()))
  }, [api, addr])

  const shortAddr = addr.substring(0, 5) + '...' + addr.substring(addr.length - 5)
  const isKsm = token === 'ksm'
  const browserHost = `https://${isKsm ? 'kusama' : ''}.subscan.io/account`

  return <Wrapper title={addr}>
    {identity ? (
      <>
        <Icon name='chain' />
        <a href={`${browserHost}/${addr}`} target="_blank" rel="noreferrer">
          {identity.info.display.Raw}
        </a>
      </>
    ) : <a href={`${browserHost}/${addr}`} target="_blank" rel="noreferrer">{shortAddr}</a>
    }
  </Wrapper>
}
