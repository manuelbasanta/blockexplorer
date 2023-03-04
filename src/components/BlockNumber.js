import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

const ICON_SIZE = 22;

const BlockNumber = ({loading, text}) => (
  <Chip
    icon={loading ? <CircularProgress size={ICON_SIZE} /> : <CircularProgress variant="determinate" value={100} size={ICON_SIZE} />}
    color="primary"
    variant="outlined"
    label={loading ? 'Loading...' : text} />
)
  
export default BlockNumber;