import { Cluster, StreamClient } from '@streamflow/stream';
import * as React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import withStreamflow from '../hoc/StreamflowProvider';


const DashboardContainer = () => {
  
  
  return <DashboardComponent />
}

export default withStreamflow(DashboardContainer);
