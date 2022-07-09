import { Button, ButtonTypeMap } from '@mui/material';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { BeatLoader } from 'react-spinners';

type ButtonProps = PropsWithChildren<{
    onClick?: any;
    loading?: boolean;
    to?: string;
}> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
    & DefaultComponentProps<ButtonTypeMap<{}, "button">>;

const KButton: React.FC<ButtonProps> = ({
    onClick = undefined,
    loading = false,
    to = '/',
    children,
    ...rest
}) => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={onClick ? onClick : () => navigate(to)}
            {...rest}
            style={{ display: 'inherit' }}
        >
            <BeatLoader size={10} color="#eee" loading={loading} />
            {!loading && children}
        </Button>
    );
};

export default KButton;
