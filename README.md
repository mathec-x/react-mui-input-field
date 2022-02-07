# react-mui-input-field
tool for single input material design

- customized for desktop and mobile

## Install
 - yarn
``` bash
yarn add react-mui-input-field
```

 - npm
``` bash
npm i react-mui-input-field
```
### dependencies

The entire package was built using material design v5
```json
"dependencies": {
  "@emotion/react": "^11.7.1",
  "@emotion/styled": "^11.6.0",
  "@mui/icons-material": "^5.3.1",
  "@mui/material": "^5.4.0",
  "react": "^17.0.2",
  "react-dom": "^17.0.2"
}
```

```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled

```

### example

<img src="./assets/lib.gif" width="550" height="350"/>

```js
import React from 'react';
import InputField from 'react-mui-input-field';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const App = (props) => {
  const [state, setState] = React.useState({
    login: '',
    password: '',
    date: ''
  });

  return (
    <Grid container style={styles}>
        <pre style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'black', color: 'white' }}>
        {JSON.stringify(state)}
        </pre>
      <Card component={Grid} item md={6} sm={12} xs={12}>
        <CardHeader
          title="Ecosistema de testes"
          subheader="Credenciais de acesso"
          action={''}
        />
        <CardContent>
          <InputField
            variant='standard'
            type="email"
            size="small"
            fullWidth
            required
            margin="normal"
            value={state.login}
            onSubmit={(value) => setState({ ...state, login: value })}
            label="Login"
            valid={(e) => e.length > 0}
            helperText="Login de acesso"
            errorText="Texto precisa de atenção"
          />
          <InputField
            fullWidth
            variant='standard'
            allowNull
            size="small"
            type='password'
            margin="normal"
            value={state.password}
            onSubmit={(value) => setState({ ...state, password: value })}
            label="Senha"
            helperText="Senha de acesso"
            errorText="Texto precisa de atenção"
          />
          <InputField
            fullWidth
            allowNull
            type="date"
            variant='standard'
            size="small"
            margin="normal"
            value={state.date}
            onSubmit={(value) => setState({ ...state, date: value })}
            label="Aniversário"
            helperText="Data de aniversário"
            errorText="Texto precisa de atenção"
            placeholder="Informar data de aniversário"
            InputLabelProps={{
              shrink: true
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default App;
```