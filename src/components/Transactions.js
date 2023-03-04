/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlchemyProviderContext } from "../AlchemyProviderContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

const Transactions = () => {
const { blockNumber } = useParams(); 
const [transactionsData, setTransactionsData] = useState(false);
const alchemyProvider = useContext(AlchemyProviderContext);
console.log(blockNumber)
useEffect(() => {
  async function getBlockNumber() {
    setTransactionsData(await alchemyProvider.core.getBlockWithTransactions(Number(blockNumber)))
  }

  getBlockNumber();
}, [alchemyProvider.config.network]);

  return (
    <>
      <p>Transactions of block <Link to={`/${blockNumber}`}>{blockNumber}</Link></p>
       <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Hash</TableCell>
              <TableCell align="left">Confirmations</TableCell>
              <TableCell align="left">Nonce</TableCell>
              <TableCell align="left">From</TableCell>
              <TableCell align="left">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              transactionsData && (
                transactionsData.transactions.map((transaction) => (
                  <TableRow
                    key={transaction.hash}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Tooltip describeChild title={transaction.hash}>
                      <div>{transaction.hash.slice(0, 10)}...</div>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{transaction.confirmations}</TableCell>
                    <TableCell align="left">{transaction.nonce}</TableCell>
                    <TableCell align="left">
                      <Tooltip describeChild title={transaction.from}>
                      <div>{transaction.from.slice(0, 10)}...</div>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip describeChild title={transaction.to}>
                        { transaction.to ? <div>{transaction.to.slice(0, 10)}...</div> : <div>-</div>}
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Transactions;