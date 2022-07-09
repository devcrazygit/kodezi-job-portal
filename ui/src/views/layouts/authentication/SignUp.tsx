// Authentication layout components

import { css } from "@emotion/css";
import { Button, Card, Grid, Stack, TextField, Typography } from "@mui/material";
const SignUp = () => {
  return (
    <>
      <div
        className={css`
        background-image: url(/images/bg-sign-in-basic.jpeg);
        width: 100%;
        min-height: 100vh;
        opacity: 1;
        color: #344767;
        box-shadow: none;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        `}
      >
        <Grid container spacing={1} justifyContent="center" alignItems="center" className="">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <div className={css`
                margin-left: 16px;
                margin-right: 16px;
                margin-top: 24px;
                padding: 16px;
                margin-bottom: 8px;
                text-align: center;
                opacity: 1;
                background: linear-gradient(195deg, #49a3f1, #1A73E8);
                color: #344767;
                border-radius: 0.5rem;
                box-shadow: 0rem 0.25rem 1.25rem 0rem rgb(0 0 0 / 14%), 0rem 0.4375rem 0.625rem -0.3125rem rgb(0 187 212 / 40%);
              `}>
                <Typography variant="h5" fontWeight='medium' color="white">Sign Up</Typography>
              </div>
              <div className="px-4 mt-12 mb-8">
                <Stack spacing={2} className="w-full">
                  <TextField label="Name" />
                  <TextField label="Email" />
                  <TextField label="password" type="password" />
                  <TextField label="Confirm password" type="password"/>
                </Stack>
                <div className="mt-8">
                  <Button variant="contained" color="primary" className="w-full">Sign Up</Button>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default SignUp;
