import {Avatar, Button, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {SyntheticEvent, useState} from "react";

interface FormValues  {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterBox = () => {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormValues>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const saveUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`http://localhost:8080/api/registration/customer
`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        <p>Wczytywanie danych...</p>
    }


    const paperStyle={padding:20, height: '70vh', width:280, margin:'20px auto'};
    const avatarStyle={backgroundColor: 'green', margin: '0 auto 10px'};
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid style={{textAlign: 'center'}} >
                    <Avatar style={avatarStyle}><AppRegistrationIcon/> </Avatar>
                    <h2 style={{margin: '10px 0 30px'}}>Register</h2>
                </Grid>
                    <form onSubmit={saveUser}>
                        <TextField
                            label='Full name'
                            placeholder='Enter full name'
                            style={{margin:'10px 0'}}
                            fullWidth
                            required
                            name='fullName'
                            value={form.fullName}
                            onChange={e => updateForm('fullName', e.target.value)}
                        />
                        <TextField
                            label='Email'
                            placeholder='Enter email'
                            style={{margin:'10px 0'}}
                            fullWidth
                            required
                            name='email'
                            value={form.email}
                            onChange={e => updateForm('email', e.target.value)}
                        />
                        <TextField
                            label='Password'
                            placeholder='Enter password'
                            style={{margin:'10px 0'}}
                            type='password'
                            fullWidth
                            required
                            name='password'
                            value={form.password}
                            onChange={e => updateForm('password', e.target.value)}
                        />
                        <TextField
                            label='Confirm password'
                            placeholder='Confirm password'
                            style={{margin:'10px 0'}}
                            type='password'
                            fullWidth
                            required
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={e => updateForm('confirmPassword', e.target.value)}
                        />
                        <Button type='submit' style={{margin:'10px 0'}} color='primary' variant='contained' fullWidth>Register</Button>
                    </form>
            </Paper>
        </Grid>
    )
}