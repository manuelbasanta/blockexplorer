import { Network } from "alchemy-sdk";
import { useContext } from "react";
import { AlchemyProviderContext } from "../AlchemyProviderContext";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const NetworkSelector = ({onChangeNetwork}) => {
  const alchemyProvider = useContext(AlchemyProviderContext);
  const handleChange = (event) => {
    onChangeNetwork((event.target).value);
  };
  return (
    // <button onClick={() => props.setNetwork(Network.ETH_GOERLI)}>SET NETWORK</button>
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Select Network</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={alchemyProvider.config.network}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value={Network.ETH_MAINNET} control={<Radio />} label="Mainnet 🔨" />
        <FormControlLabel value={Network.ETH_GOERLI} control={<Radio />} label="Goerli 🧪" />
      </RadioGroup>
    </FormControl>
  )

};

export default NetworkSelector;