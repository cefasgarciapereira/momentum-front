import {
    TextField
} from '@material-ui/core';

export default function SignUpForm(props) {
    const {
        handleChange,
        values,
        handleSubmit
    } = props;

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0', overflow: 'auto' }}>
            <TextField
                fullWidth
                name="name"
                value={values.name}
                onChange={handleChange}
                label="Nome Completo"
                variant="outlined"
                required
            />

            <TextField
                fullWidth
                value={values.email}
                onChange={handleChange}
                label="E-mail"
                name="email"
                variant="outlined"
                required
            />

            <TextField
                fullWidth
                value={values.password}
                onChange={handleChange}
                name="password"
                label="Senha"
                variant="outlined"
                type="password"
                required
            />

            <TextField
                fullWidth
                value={values.password_confirmation}
                onChange={handleChange}
                name="password_confirmation"
                label="Confirme sua senha"
                variant="outlined"
                type="password"
                required
            />
        </form>
    )
}