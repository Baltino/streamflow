import { CreateParams } from '@streamflow/stream';
import * as React from 'react';
import CreateStreamComponent from '../components/CreateStreamComponent';
import withStreamflow, { StreamflowPropsHOC } from '../hoc/StreamflowProvider';


const CreateStreamContainer = ({ streamClient, wallet }: StreamflowPropsHOC) => {
  
  const handleCreateStream =  async (values: CreateParams) => {
    if (!streamClient || !wallet) return;

    const response = await streamClient.create({
      ...values,
      sender: wallet
    })
  }

  return <CreateStreamComponent onCreateStream={handleCreateStream}/>
}

export default withStreamflow(CreateStreamContainer);
