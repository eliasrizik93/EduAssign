import { makeStyles } from "@material-ui/core";

const Users = [{
    name: 'elias rizik',
    time: '10:00',
    notifications: 3,
    lastMessage: 'hello how are you?',
    iconImage: 'ss'
},
{
    name: 'jack sparrow',
    time: '10:00',
    notifications: 3,
    lastMessage: 'hello how are you?',
    iconImage: 'qwe'
},
{
    name: 'david alba',
    time: '10:30',
    notifications: 3,
    lastMessage: 'hello how are you?',
    iconImage: 'rr'
},
{
    name: 'Lionel Messi',
    time: '10:00',
    notifications: 3,
    lastMessage: 'hello how are you?',
    iconImage: 'wwq'
}]

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: '100%',
    }
}))
const SidebarMessagesList = () => {
    const classes = useStyles()
    return (
        <>
            {Users.length > 0 && Users.map(user => {
                return (
                    <div className={`flex items-center ${classes.fullWidth}`}>
                        <div>{user.iconImage}</div>
                        <div className="ml-4">
                            <div className="flex">
                                <div>{user.name}</div>
                                <div className="ml-auto">{user.time}</div>
                            </div>
                            <div>{user.lastMessage}</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}


export default SidebarMessagesList