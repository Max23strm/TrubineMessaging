import mainIcon from '../assets/engine.png'
import logoutIcon from "../assets/logout.png"

const SideBar = ({logout}) => {
    return (
        <div className='channel-list__sidebar' >
            <div className='channel-list__sidebar__icon1'>
                <div className='icon1__inner'>
                    <img src={mainIcon}  alt="Turbine" width={30} />
                </div>
            </div>
            <div className='channel-list__sidebar__icon2'>
                <div className='icon1__inner' onClick={logout}>
                    <img src={logoutIcon}  alt="Logout" width={30} />
                </div>
            </div>
        </div>
    )
}

export default SideBar