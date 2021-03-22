import { useState } from 'react';
import {
    Box,
    DialogTitle,
    Dialog,
    IconButton,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const initialState = {
    type: "momentum",
    universe: 'IBOV',
    look_back: 12,
    port_size: 15
}

export default function FilterDialog(props) {
    const { visible, handleClose, handleSubmit } = props;
    const [values, setValues] = useState(initialState);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={visible}>
            <DialogTitle>
                <Box style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    Buscar Estratégia
                    <IconButton
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <FormControl fullWidth>
                    <InputLabel id="type">Tipo de Estratégia</InputLabel>
                    <Select
                        labelId="type"
                        id="type-select"
                        value={values.type}
                        onChange={(e) => setValues({ ...values, type: e.target.value })}
                    >
                        <MenuItem value="momentum">Momentum</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="universe">Universo</InputLabel>
                    <Select
                        labelId="universe"
                        id="universe-select"
                        value={values.universe}
                        onChange={(e) => setValues({ ...values, universe: e.target.value })}
                    >
                        <MenuItem value="IBOV">Ibovespa</MenuItem>
                        <MenuItem value="IBRA">Ibra</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="look_back">Período de Lookback</InputLabel>
                    <Select
                        labelId="look_back"
                        id="look_back-select"
                        value={values.look_back}
                        onChange={(e) => setValues({ ...values, look_back: e.target.value })}
                    >
                        <MenuItem value={6}>6 meses</MenuItem>
                        <MenuItem value={12}>12 meses</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="port_size">Quantidade de Ativos</InputLabel>
                    <Select
                        labelId="port_size"
                        id="port_size-select"
                        value={values.port_size}
                        onChange={(e) => setValues({ ...values, port_size: e.target.value })}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>

                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit(values)}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}