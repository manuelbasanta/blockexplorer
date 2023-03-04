/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlchemyProviderContext } from "../AlchemyProviderContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BlockNumber from "./BlockNumber";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BlockData = () => {
  const { blockNumber } = useParams(); 
  const alchemyProvider = useContext(AlchemyProviderContext);
  const [loading, setLoading] = useState(false);
  const [blockData, setBlockData] = useState({});
  useEffect(() => {
    async function getBlockData() {
      setLoading(true);
      
      if(!blockNumber) {
        const latestblock = await alchemyProvider.core.getBlockNumber();
        setBlockData(await alchemyProvider.core.getBlock(latestblock));
      } else {
        setBlockData(await alchemyProvider.core.getBlock(Number(blockNumber)));
      }
      setLoading(false);
    }

    getBlockData();
  }, [alchemyProvider.config.network, blockNumber]);

  if(!blockData) {
    return (
      <Card variant="outlined" sx={{ width: 'max-content'}}>
        <Typography sx={{ padding: 14 }}>
          No data for block <strong>{blockNumber}</strong> in <strong>{alchemyProvider.config.network}</strong> Network
        </Typography>
      </Card>
    )
  }

  return (
    <Card variant="outlined" sx={{ width: 'max-content', minWidth: 600}}>
      <CardContent>
        <BlockNumber loading={loading} text={blockNumber ? `Block: ${blockData.number}` : `Latest Block: ${blockData.number}`}/>
        <List sx={{ width: '100%'}}>
          <ListItem>
            <ListItemText primary="Timestamp" secondary={loading ? '-' : new Date(blockData.timestamp * 1000).toLocaleString()} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Hash" secondary={loading ? '-' : blockData.hash} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Miner"  secondary={loading ? '-' : blockData.miner} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Parent Hash"  secondary={loading ? '-' : blockData.parentHash} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nonce"  secondary={loading ? '-' : blockData.nonce} />
          </ListItem>
          {
            (!loading) && (
              <Link to={`/transactions/${blockData.number}`}>
                <Button variant="outlined">
                  View {blockData.transactions?.length} transactions
                </Button>
              </Link>
            )
          }
        </List>
      </CardContent>
    </Card>
  )
}

export default BlockData;