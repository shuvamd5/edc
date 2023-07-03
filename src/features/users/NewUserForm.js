import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"
import { QUALIFICATIONS } from "../../config/qualification"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('EDC: New User')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [qualification, setQualification] = useState([])
    const [roles, setRoles] = useState(["Employee"])
    //const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(firstname))
    }, [firstname])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setFirstname('')
            setMiddlename('')
            setLastname('')
            setPassword('')
            setAddress('')
            setEmail('')
            setContact('')
            setQualification([])
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    //const onUsernameChanged = e => setUsername(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onMiddlenameChanged = e => setMiddlename(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onAddressChanged = e =>setAddress(e.target.value)
    
    const onEmailChanged = e =>setEmail(e.target.value)

    const onContactChanged = e =>setContact(e.target.value)

    const onQualificationsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setQualification(values)
    }

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ firstname, middlename, lastname, password, address, email, contact, qualification, roles })
        }
    }

    const qoptions = Object.values(QUALIFICATIONS).map(qualification => {
        return (
            <option
                key={qualification}
                value={qualification}

            > {qualification}</option >
        )
    })

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const validQualificationClass = !Boolean(qualification.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New Employee</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <div className="p1">
                    <label className="form__label" htmlFor="firstname">
                        Firstname : </label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={firstname}
                        onChange={onFirstnameChanged}
                    />

                    <label className="form__label" htmlFor="middlename">
                        Middlename : </label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={middlename}
                        onChange={onMiddlenameChanged}
                    />

                    <label className="form__label" htmlFor="lastname">
                        Lastname : </label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={lastname}
                        onChange={onLastnameChanged}
                    />

                    <label className="form__label" htmlFor="password">
                        Password : </label>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="[4-12 chars incl. !@#$%]"
                        onChange={onPasswordChanged}
                    />
                </div>

                <div className="p2">
                    <label className="form__label" htmlFor="address">
                        Address : </label>
                    <input
                        className={`form__input`}
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="off"
                        value={address}
                        onChange={onAddressChanged}
                        required
                    />

                    <label className="form__label" htmlFor="email">
                        E-mail : </label>
                    <input
                        className={`form__input`}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={onEmailChanged}
                        required
                    />

                    <label className="form__label" htmlFor="contact">
                        Contact : </label>
                    <input
                        className={`form__input`}
                        id="contact"
                        name="contact"
                        type="text"
                        autoComplete="off"
                        value={contact}
                        onChange={onContactChanged}
                        required
                    />                   

                    <div className="qandr">
                        <div className="q">
                            <label className="form__label" htmlFor="qualification">
                                Qualifications :</label>
                            <select
                                id="qualification"
                                name="qualification"
                                className={`form__select ${validQualificationClass}`}
                                multiple={true}
                                size="3"
                                value={qualification}
                                onChange={onQualificationsChanged}
                            >
                                {qoptions}
                            </select>
                        </div>

                        <div className="r">
                            <label className="form__label" htmlFor="roles">
                                Roles :</label>
                            <select
                                id="roles"
                                name="roles"
                                className={`form__select ${validRolesClass}`}
                                multiple={true}
                                size="3"
                                value={roles}
                                onChange={onRolesChanged}
                            >
                                {options}
                            </select>
                        </div>
                    </div>
                </div> 

            </form>
        </>
    )

    return content
}
export default NewUserForm