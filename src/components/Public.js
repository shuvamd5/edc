import { Link, useNavigate } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Employee Data Collection Application</span></h1>
            </header>
            <main className="public__main">
                <p>This project is about the assignment about Employee Data Collection Application given by BitsKraft for the Intership opportunity.</p>
                <address className="public__addr">
                    Assignment : Employee Data Collection Application<br />
                    Requirement : CRUD Operation<br />
                    Framework used : MERN Stack<br />
                    <br />
                    <p>The application maintain the data as per the requirement which are :</p> <br />
                    &#62; Employee Name [First Name, Middle Name, Last Name] <br />
                    &#62; Employee Address <br />
                    &#62; Employee Contact [Email, Mobile No] <br />
                    &#62; Employee Qualification [Diploma, Bachelor, Masters]
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
                <p>Shuvam Shakya</p>
            </footer>
        </section>

    )
    return content
}
export default Public