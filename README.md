# react-mui-input-field
tool for single input material design

## Install
 - yarn
``` bash
yarn add react-mui-input-field
```

 - npm
``` bash
npm i react-mui-input-field
```

### example

```js
import InputField from 'react-mui-input-field';

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

![example](./assets/lib.gif)