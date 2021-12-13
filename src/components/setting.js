import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Form'
import { displaySettings } from './context'

export default function Setting() {
    const context = useContext(displaySettings);

    function handelSettingSubmit() {
        // e.preventDefault()
        const checkbox = document.getElementById("showComplete")
        const formSelect = document.getElementById('itemPage')
        let polean;
        if (checkbox.value === 'true') {
            polean = true
        } else { polean = false }
        const num = formSelect.value
        context.settingHandel(polean, num)
        console.log(polean, num, '==========================');
    }
    return (
        <div>
            <Form >
                <Form.Label>item per page</Form.Label>
                <Form.Select className="me-sm-2" id="itemPage" >                    
                    <option value="3">three</option>
                    <option value="4">four</option>
                    <option value="5">five</option>
                </Form.Select>
                <Form.Label>show completed</Form.Label>
                <Form.Select className="me-sm-2" id="showComplete">
                    <option value='false'>show</option>
                    <option value="true">hide</option>
                </Form.Select>

            </Form>
            <button onClick={() => { handelSettingSubmit() }} variant="primary" type="submit">
                Save
            </button>
        </div>
    )
}
