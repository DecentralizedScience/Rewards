import { Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

const { Meta } = Card;

export default function PaperView(props) {

  function openPaper() {
    window.location.href='/paper/' + props.id
  }

  return(
    <Card
        style={{ width: 300 }}

        actions={[
          <EyeOutlined key="show" onClick={openPaper}/>,
        ]}
        >
        <Jazzicon diameter={100} seed={jsNumberForAddress(props.author)} />
        <Meta
          description={props.author}
          title={props.title}
        />
    </Card>
  );
}