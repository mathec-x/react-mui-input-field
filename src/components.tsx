import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { FormProps, InputModalProps } from './types';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MuiFormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

export const Form: React.FC<FormProps> = ({
    label, action, legend, children, ...props
}) => (
    <FormControl component={props.onSubmit ? "form" : "fieldset"} {...props}>
        <FormLabel
            component="legend"
            sx={{
                ml: 0,
                width: '100%',
                alignItems: 'center',
                flexGrow: 1,
                justifyContent: 'space-between',
                display: 'flex'
            }}>
            {label}
            <div style={{ height: 44 }}>
                {action}
            </div>
        </FormLabel>
        <MuiFormGroup>
            {React.Children.toArray(children)}
        </MuiFormGroup>
        <FormHelperText sx={{ ml: 0 }}>{legend}</FormHelperText>
    </FormControl>
);



export const DialogTransitionSlide = React.forwardRef(function DialogTransitionSlide(props: any, ref) {
    return <Slide direction={"up"} ref={ref} {...props} />;
});

export const InputModal: React.FC<InputModalProps> = (props) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const hash = React.useMemo(() => {
        let hash = 0;
        for (let i = 0; i < props.label.length; i++) {
            let char = props.label.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        };

        return hash;
    }, [props.label])

    const setHash = React.useCallback(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (window.location.hash !== `#input-field-${hash}`) {
                    window.location.hash = `input-field-${hash}`;
                } else {
                    window.location.hash = '';
                }

                resolve(window.location.hash);
            }, 355);
        })
    }, [props.label]);

    React.useEffect(() => {
        console.log('effect2');
        const onHashChanged = () => {
            console.log('[hash change]', window.location.hash);

            if (window.location.hash === `#input-field-${hash}`) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };

        if (typeof window !== 'undefined' && props.enabled) {
            window.addEventListener("hashchange", onHashChanged);
            onHashChanged();
            return () => {
                window.removeEventListener("hashchange", onHashChanged);
            };
        };

        return () => {

        }

    }, [props]);


    const getValue = React.useMemo(() => {
        const value = props.value as string;
        const type = props.type as string;

        if (value && type === 'password') {
            return '*'.repeat(value.length);
        }

        if (value && type.indexOf('date') !== -1) {
            return new Intl.DateTimeFormat().format(new Date(Date.parse(value)));
        }

        return value;

    }, [props])

    const handleCancel = () => {
        return Promise.all([setHash(), props.onCancel()])
    };

    return (
        <>
            <FormControl
                fullWidth
                onClick={() => setHash()}
                sx={{
                    cursor: 'pointer',
                    height: (theme) => theme.spacing(6)
                }}

            >
                <FormHelperText>{props.label}</FormHelperText>
                <InputLabel sx={{ color: (theme) => getValue && theme.palette.text.primary }}>
                    {getValue || props.placeholder}
                </InputLabel>
            </FormControl>
            <Dialog
                id={`input-field-${hash}`}
                components={{
                    Root: 'form'
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    return Promise.all([setHash(), props.onConfirm()])
                }}
                sx={{
                    mt: 2,
                    position: 'fixed',
                    zIndex: 1300,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    left: 0
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 2
                    }
                }}
                fullScreen
                open={open}
                onClose={handleCancel}
                TransitionComponent={DialogTransitionSlide}
            >
                <Box sx={{ m: 1 }}>
                    <IconButton
                        onClick={handleCancel}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogTitle>
                    {props.label}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 6 }}>
                        {props.caption}
                    </DialogContentText>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        disabled={props.disabled}
                        fullWidth
                        color='primary'
                        variant='contained'>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}