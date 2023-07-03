import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { QUALIFICATIONS } from "../../config/qualification"

const USER_REGEX = /^[A-z]+\s?[A-z]+\s?[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState(user.firstname)
    const [middlename, setMiddlename] = useState(user.middlename)
    const [lastname, setLastname] = useState(user.lastname)
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [address, setAddress] = useState(user.address)
    const [email, setEmail] = useState(user.email)
    const [contact, setContact] = useState(user.contact)
    const [qualification, setQualification] = useState(user.qualification)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setAddress('')
            setEmail('')
            setContact('')
            setQualification([])
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    // const onFirstnameChanged = e => setFirstname(e.target.value)
    // const onMiddlenameChanged = e => setMiddlename(e.target.value)
    // const onLastnameChanged = e => setLastname(e.target.value)
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

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, address, email, contact, qualification, roles, active })
        } else {
            await updateUser({ id: user.id, username, address, email, contact, qualification, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
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

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validQualificationClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Employee</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <div className="p1">
                    <label className="form__label" htmlFor="username">
                        Username: </label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />

                    <label className="form__label" htmlFor="password">
                        Password : </label>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        placeholder="[4-12 chars incl. !@#$%] / [empty = no change]"
                        onChange={onPasswordChanged}
                    />
                
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
                </div>

                <div className="p2">

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

                    <label className="form__label form__checkbox-container" htmlFor="user-active">
                        ACTIVE:
                        <input
                            className="form__checkbox"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>
                </div>
                
            </form>
        </>
    )

    return content
}
export default EditUserForm