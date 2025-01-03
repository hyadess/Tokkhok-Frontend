import { ClipLoader, RingLoader ,CircleLoader, BeatLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({loading}) => {
    return (
        <div className='loading-screen'>
            <BeatLoader color='#f0f0f0' loading={loading} size={20} />
        </div>
    );
};

export default Loader;