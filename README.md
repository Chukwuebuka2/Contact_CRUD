# TM30 Contact project

## How to use this service

To use this service follow the steps below:
1. First clone using 
`https://github.com/Chukwuebuka2/TM30.git`


2. Navigate to the folder `TM30` by using the command
`cd TM30`

3. Install the needed packages
`npm i`
or 
`npm install`

3. Launch the code
`npm run start`



Read the following for the API documentation 

The following operations can be performed: 
- Register as a user
- Login as a user
- Create contact
- Get all contact
- Get a single contact by ID
- Update contact
- Add phone number to phonebook
- Delete phone number
- Delete contact

<table>
    <tbody>
        <tr>
            <th>Action</th>
            <th>Method</th>
            <th>Request URL</th>
            <th>Authorization</th>
            <th>Request body</th>
            <th>Request parameter</th>
            <th>Request query</th>
        </tr>
        <tr>
            <td>Register user</td>
            <td>POST</td>
            <td><i><u>http://localhost:3000/v1/auth/register</u></i></td>
            <td>NIL</td>
            <td>
                <ul>
                    <li> password: Tobiloba2@@#</li>
                    <li> email: nwokporochukwuebuka@yahoo.com</li>
                    <li>firstName: Chukwuebuka</li>
                    <li>lastName: Nwokporo</li>
                </ul>
            </td>
            <td>NIL</td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Login user</td>
            <td>POST</td>
            <td><i><u>http://localhost:3000/v1/auth/login</u></i></td>
            <td>NIL</td>
            <td>
                <ul>
                    <li> password: Tobiloba2@@#</li>
                    <li> email: nwokporochukwuebuka@yahoo.com</li>
                </ul>
            </td>
            <td>NIL</td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Create contact</td>
            <td>POST</td>
            <td><i><u>http://localhost:3000/v1/contact/create</u></i></td>
            <td>YES</td>
            <td>
                <ul>
                    <li> firstName: Chukwuebuka2</li>
                    <li> lastName: Nwokporo</li>
                    <li> phonebook
                        <ul>
                            <li>type: mobile</li>
                            <li>phoneNumber: +2349032513401</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>NIL</td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Get all contacts</td>
            <td>GET</td>
            <td><i><u>http://localhost:3000/v1/contact/</u></i></td>
            <td>YES</td>
            <td>NIL</td>
            <td>NIL</td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Get contact by ID</td>
            <td>GET</td>
            <td><i><u>http://localhost:3000/v1/contact/{contactId}</u></i></td>
            <td>YES</td>
            <td>NIL</td>
            <td>contactId: 2</td>
            <td>NIL</th>
        </tr>
        <tr>
            <td>Update contact or phone number</td>
            <td>PATCH</td>
            <td><i><u>http://localhost:3000/v1/contact/{contactId}/phonebook/{phonebookId}</u></i></td>
            <td>YES</td>
            <td>
                <ul>
                    <li> firstName: Chukwuebuka</li>
                    <li> lastName: Oluwatobiloba</li>
                    <li> phonebook
                        <ul>
                            <li>type: mobile</li>
                            <li>phoneNumber: +2348116338050</li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>contactID: 2</li>
                    <li>phoneBookId: 4</li>
                </ul>
            </td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Add phone number</td>
            <td>POST</td>
            <td><i><u>localhost:3000/v1/contact/{contactId}</u></i></td>
            <td>YES</td>
            <td>
                <ul>
                    <li>type: mobile</li>
                    <li>phoneNumber: +2348116338050</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li>contactID: 2</li>
                </ul>
            </td>
            <td>NIL</td>
        </tr>
        <tr>
            <td>Delete phone number</td>
            <td>DELETE</td>
            <td><i><u>http://localhost:3000/v1/contact/{contactId}/phonebook/{phonebookId}</u></i></td>
            <td>YES</td>
            <td>NIL</td>
            <td>NIL</th>
            <td>NIL</th>
        </tr>
        <tr>
            <td>Delete contact</td>
            <td>DELETE</td>
            <td><i><u>http://localhost:3000/v1/contact/{contactId}</u></i></td>
            <td>YES</td>
            <td>NIL</td>
            <td>contactId: 3</th>
            <td>NIL</th>
        </tr>
    </tbody>

</table>
