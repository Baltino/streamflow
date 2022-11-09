import { CreateParams } from '@streamflow/stream';
import * as React from 'react';
import CreateStreamComponent from '../components/CreateStreamComponent';
import withStreamflow, { StreamflowPropsHOC } from '../hoc/StreamflowProvider';
import { StatusRequest } from '../types';


const CreateStreamContainer = ({ streamClient, wallet }: StreamflowPropsHOC) => {
  const [response, setResponse] = React.useState<{ status: StatusRequest, error: string }>({
    error: '',
    status: StatusRequest.initial,
  });
  
  const handleCreateStream =  async (values: CreateParams) => {
    if (!streamClient || !wallet) return;

    try {
      setResponse({ error: '', status: StatusRequest.in_progress });

      const response = await streamClient.create({
        ...values,
        sender: wallet
      })
      setResponse({ status: StatusRequest.success, error: '' });
    }catch(e) {
      setResponse({ status: StatusRequest.error, error: e.toString() })
    }
  }

  return <CreateStreamComponent onCreateStream={handleCreateStream} wallet={wallet} response={response} />
}

export default withStreamflow(CreateStreamContainer);
