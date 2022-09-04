import { ChannelList, useChatContext } from "stream-chat-react"
import Cookies from "universal-cookie"

import { ChannelSearch, TeamChannelList, TeamChannelPreview, SideBar,CompanyHeader } from "./"

const cookies= new Cookies();

const ChannelListContainer = () => {

    const logout=()=>{
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    return (
        <>
            <SideBar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={()=>{}}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                        />
                    )}
                    Preview={(previewProps)=>{
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                        />
                    }}
                />
                <ChannelList 
                    filters={{}}
                    channelRenderFilterFn={()=>{}}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                        />
                    )}
                    Preview={(previewProps)=>{
                        <TeamChannelPreview
                            {...previewProps}
                            type="messaging"
                        />
                    }}
                />
            </div>
        </>
    )
}

export default ChannelListContainer