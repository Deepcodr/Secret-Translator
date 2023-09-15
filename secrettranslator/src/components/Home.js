import { Grid, Box, Button } from "@mui/material";
import Item from "@mui/material/Grid";
import Image from "./login_back1.png";
import Typography from '@mui/material/Typography';

const styles = {
  gridContainer: {
    width: "100vw",
    backgroundImage: `url(${Image})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat : "no-repeat"
  }
};

function Home() {
  return (
       <Grid container style={styles.gridContainer}>
        <Grid item xs={12} sm={6} md={4} lg={6}>
          <Item style={{padding : 10}}>
            <Typography variant="h1" gutterBottom style={{ marginBottom : 10, fontWeight: 600 , padding : 10 ,fontSize : '10vw' }}>Secret Translator
            </Typography>
            <Typography variant="h2" gutterBottom style={{padding : 10 ,fontSize : '4vw'}}>
                Speech To Text Application For Police 
            </Typography>
            <Button href="/login" style={{ margin : 0 , padding : 5}}>
                <Box
                  sx={{
                    boxShadow: 3,
                    width: '20',
                    height: '20',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                      theme.palette.mode === 'alert' ? 'grey.300' : 'grey.800',
                    p: 1,
                    m: 1,
                    borderRadius: 5,
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '700',

                  }}
                >
                  Get Started
                </Box>
              </Button>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} order={{ xs: 3, sm: 2 }}>
        </Grid>
      </Grid>
      
  );
}

export default Home;
