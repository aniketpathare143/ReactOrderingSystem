import { useState, useEffect } from "react";
import { Button, Form, Input, LabelDetail } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [correct, setCorrect] = useState(false);
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCorrect(true);
                console.log("correct");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [correct]);

    const handleChangeUname = (e) => {
        setUname(e.target.value)
    }

    const handleChangePwd = (e) => {
        setPwd(e.target.value)
    }

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000)

        if (uname === 'sai' && pwd === 'sai') {
            navigate('/DataComponent')
        }
    }
    return (
        <div class="page-login">
            <div class="ui centered grid container">
                <div class="nine wide column">
                    {
                        loading &&
                        <div class="ui icon warning message">
                            <i class="lock icon"></i>
                            {                               
                                <div class="content">
                                    <div class="header">
                                        Login failed!
                                    </div>
                                    <p>You might have misspelled your username or password!</p>
                                </div>
                            }
                        </div>
                    }

                    {loading && <div>Verifying please wait...</div>}
                    <div class="ui fluid card">
                        <div class="content">
                            <Form class="ui form" onSubmit={handleSubmit}>
                                <div class="field">
                                    <LabelDetail>User</LabelDetail>
                                    <Input type="text" name="uname" onChange={handleChangeUname} placeholder="User" />
                                </div>
                                <div class="field">
                                    <LabelDetail>Password</LabelDetail>
                                    <Input type="password" name="pwd" onChange={handleChangePwd} placeholder="Password" />
                                </div>
                                <Button class="ui primary labeled icon button" type="submit">
                                    <i class="unlock alternate icon"></i>
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;