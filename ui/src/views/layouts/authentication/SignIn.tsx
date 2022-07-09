// Authentication layout components

import { css } from "@emotion/css";
import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import LocalStorage from "global/LocalStorage";
import useApi from "hooks/useApi";
import useFormData from "hooks/useFormData";
import commonApi from "modules/api/common";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store";
import { setSession } from "store/reducers/session";
import { SigninRequest } from "types/models/auth";
import { Role } from "types/models/session";
import { RulesType } from "types/validation";
import KButton from "views/components/Button";
import ValidationErrorMessage from "views/components/ValidationErrorMessage";
const SignIn = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { apiErrorHandler } = useApi();
  const navigate = useNavigate();

  
  const rules: RulesType<SigninRequest> = {
    email: ['required', 'email'],
    password: ['required', 'minLength:6'],
  }
  const { data, errors, validate, onInput } = useFormData<SigninRequest>({
    email: '',
    password: ''
  }, rules);

  const handleSubmit = useCallback(() => {
    if (loading) return;
    const result = validate();
    if (!result) {
      setLoading(true);
      commonApi.signin(data)
      .then(response => {
        LocalStorage.saveToken(response.token);
        dispatch(setSession(response.user));
        if (response.user.role === Role.ADMIN) {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      })
      .catch(e => {
        apiErrorHandler(e);
        setLoading(false);
      })
    }
  }, [apiErrorHandler, data, dispatch, loading, navigate, validate])
  
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
                <Typography variant="h5" fontWeight='medium' color="white">Sign In</Typography>
              </div>
              <div className="px-4 mt-12 mb-8">
                <Stack spacing={2} className="w-full">
                  <TextField label="Email" onChange={onInput('email')} value={data.email} error={!!errors.email?.length} />
                  <ValidationErrorMessage
                    errors={errors.email}
                    params={{ name: 'Email' }}
                    rules={rules.email}
                  />
                  <TextField label="password" type="password" onChange={onInput('password')} value={data.password} error={!!errors.password?.length} />
                  <ValidationErrorMessage
                    errors={errors.password}
                    params={{ name: 'Password' }}
                    rules={rules.password}
                  />
                </Stack>
                <div className="mt-8">
                  <KButton variant="contained" color="primary" className="w-full" loading={loading} onClick={handleSubmit}>Sign In</KButton>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default SignIn;
