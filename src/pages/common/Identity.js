import React, { useEffect, useState } from "react";
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.span`
  i {
    font-size: 12px;
    color: #00C6B9;
  }
`;

export default function Identity({ api, addr }) {
  const [identity, setIdentity] = useState(null)

  useEffect(() => {
    api.query.identity.identityOf(addr).then(identity => setIdentity(identity.toHuman()))
  }, [api, addr])

  const shortAddr = addr.substring(0, 5) + '...' + addr.substring(addr.length - 5)

  return <Wrapper title={addr}>
    {identity ? (
      <>
        <Icon name='chain' />
        {identity.info.display.Raw}
      </>
    ) : shortAddr}
  </Wrapper>
}
