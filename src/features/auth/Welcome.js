import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()
    useTitle(`EDC: ${username}`)

    const content = (
        <section className="welcome">

            <h1>Welcome {username} !</h1>

            {(isManager || isAdmin) &&
            <p><Link to="/dash/users">View Employees</Link></p>
            }

            {(isManager || isAdmin) &&
            <p><Link to="/dash/users/new">Add New Employee</Link></p>
            }

        </section>
    )

    return content
}
export default Welcome