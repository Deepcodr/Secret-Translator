
import { Grid,Box ,Button, Input,MenuItem,FormControl,InputLabel,Select,FormHelperText, Stack} from "@mui/material";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { uploadFile } from "./services/api";


/**local imports */

//alert API
import swal from 'sweetalert';

//import image for background
import Image from "./upload.png";

const initialValues={
    inputLang:"marathi",
    outputLang:"hindi",
    audioFile:""
    
};



function UploadFile()
{
    
    const [ilang, setilang] = useState('marathi');
    
    const [olang, setolang] = useState('hindi');
    
    const [data , setdata] = useState(initialValues);
    const [output,setOutput] = useState('');
    // const handleChange = (e) => {
        //     setdata({...user,[e.target.name]:e.target.value})
    


    const downloadTxtFile = () => {
        if(output===""){
            swal("Error ! ", "First record and submit the file!!", "error");
          }else{
            const element = document.createElement("a");
            const file = new Blob([output], {
                type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = "myFile.txt";
            document.body.appendChild(element);
            element.click();
          }
    };
        
    
    
    

    const {inputLang,outputLang,audioFile}=data;

    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

    const handleChange=(e)=>{
        if(e.target.name ==="audioFile"){
            setdata({...data,[e.target.name]:e.target.files[0]})
            console.log(e.target.files[0],'ghj');
        }
        else{
            setdata({...data,[e.target.name]:e.target.value})
            if(e.target.name==='inputLang')
                setilang(e.target.value);
            else
                setolang(e.target.value);
            console.log(e.target.value);
        }
          //console.log(data);
    }

    const handleSubmit=(e)=>{
        e.preventDefault(); //vvvvvvvvvvvvvvvvvvvvvviiiiiiiiiiiiiiiiiiiiiiimmmmmmmmmmmmmmmmmmmmmmmmmmm (very imp)
        console.log(data)
        if( audioFile ===''){
            swal("Error ! ", "Please select audio file!!", "error");

        }
        else{

            uploadFile(data,config).then((res)=>{
                const data=res.data;
                setOutput(data.output);
    
            });
        }
        
    }

    const styles = {
        gridContainer: {
          width: "100%",
          backgroundImage: `url(${Image})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat : "no-repeat",
          overflow : "hidden"
        }
      };
    

    //const mapping = languages.map((x)=>{return x;})

    return(
        <>
            <Grid container style={styles.gridContainer} justifyContent="center" alignment="center">
            <Grid  >
            <Grid container direction="row" justifyContent="center" alignment="center" my={20} mr={50} >
                <Stack>
                    <div >
                        <FormControl required sx={{ m: 1, minWidth: 400 }}>
                                <InputLabel id="demo-simple-select-required-label"><b> Language Input</b>  </InputLabel>
                                <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={ilang}
                                name="inputLang"
                                label="Input Language"
                                onChange={(e)=>handleChange(e)}
                                required
                                sx={{minHeight:100,fontSize:25}}
                                >
                               
                                
                               <MenuItem value="afrikaans">afrikaans</MenuItem>
                                    <MenuItem value="albanian">albanian</MenuItem>
                                    <MenuItem value="amharic">amharic</MenuItem>
                                    <MenuItem value="arabic">arabic</MenuItem>
                                    <MenuItem value="armenian">armenian</MenuItem>
                                    <MenuItem value="azerbaijani">azerbaijani</MenuItem>
                                    <MenuItem value="basque">basque</MenuItem>
                                    <MenuItem value="belarusian">belarusian</MenuItem>
                                    <MenuItem value="bengali">bengali</MenuItem>
                                    <MenuItem value="bosnian">bosnian</MenuItem>
                                    <MenuItem value="bulgarian">bulgarian</MenuItem>
                                    <MenuItem value="catalan">catalan</MenuItem>
                                    <MenuItem value="cebuano">cebuano</MenuItem>
                                    <MenuItem value="chichewa">chinese (simplified)</MenuItem>
                                    <MenuItem value="chichewa">chinese (traditional)</MenuItem>
                                    <MenuItem value="corsican">corsican</MenuItem>
                                    <MenuItem value="croatian">croatian</MenuItem>
                                    <MenuItem value="czech">czech</MenuItem>
                                    <MenuItem value="danish">danish</MenuItem>
                                    <MenuItem value="danish">dutch</MenuItem>
                                    <MenuItem value="english">english</MenuItem>
                                    <MenuItem value="esperanto">esperanto</MenuItem>
                                    <MenuItem value="estonian">estonian</MenuItem>
                                    <MenuItem value="filipino">filipino</MenuItem>
                                    <MenuItem value="finnish">finnish</MenuItem>
                                    <MenuItem value="french">french</MenuItem>
                                    <MenuItem value="frisian">frisian</MenuItem>
                                    <MenuItem value="galician">galician</MenuItem>
                                    <MenuItem value="georgian">georgian</MenuItem>
                                    <MenuItem value="german">german</MenuItem>
                                    <MenuItem value="greek">greek</MenuItem>
                                    <MenuItem value="gujarati">gujarati</MenuItem>
                                    <MenuItem value="haitian creole">haitian creole</MenuItem>
                                    <MenuItem value="hausa">hausa</MenuItem>
                                    <MenuItem value="hawaiian">hawaiian</MenuItem>
                                    <MenuItem value="hebrew">hebrew</MenuItem>
                                    <MenuItem value="hindi">hindi</MenuItem>
                                    <MenuItem value="hmong">hmong</MenuItem>
                                    <MenuItem value="hungarian">hungarian</MenuItem>
                                    <MenuItem value="icelandic">icelandic</MenuItem>
                                    <MenuItem value="igbo">igbo</MenuItem>
                                    <MenuItem value="indonesian">indonesian</MenuItem>
                                    <MenuItem value="irish">irish</MenuItem>
                                    <MenuItem value="italian">italian</MenuItem>
                                    <MenuItem value="japanese">japanese</MenuItem>
                                    <MenuItem value="javanese">javanese</MenuItem>
                                    <MenuItem value="kannada">kannada</MenuItem>
                                    <MenuItem value="kazakh">kazakh</MenuItem>
                                    <MenuItem value="khmer">khmer</MenuItem>
                                    <MenuItem value="korean">korean</MenuItem>
                                    <MenuItem value="kurdish (kurmanji)">kurdish (kurmanji)</MenuItem>
                                    <MenuItem value="kyrgyz">kyrgyz</MenuItem>
                                    <MenuItem value="lao">lao</MenuItem>
                                    <MenuItem value="latin">latin</MenuItem>
                                    <MenuItem value="latvian">latvian</MenuItem>
                                    <MenuItem value="lithuanian">lithuanian</MenuItem>
                                    <MenuItem value="luxembourgish">luxembourgish</MenuItem>
                                    <MenuItem value="macedonian">macedonian</MenuItem>
                                    <MenuItem value="malagasy">malagasy</MenuItem>
                                    <MenuItem value="malay">malay</MenuItem>
                                    <MenuItem value="malayalam">malayalam</MenuItem>
                                    <MenuItem value="maltese">maltese</MenuItem>
                                    <MenuItem value="maori">maori</MenuItem>
                                    <MenuItem value="marathi">marathi</MenuItem>
                                    <MenuItem value="mongolian">mongolian</MenuItem>
                                    <MenuItem value="myanmar">myanmar</MenuItem>
                                    <MenuItem value="nepali">nepali</MenuItem>
                                    <MenuItem value="norwegian">norwegian</MenuItem>
                                    <MenuItem value="odia">odia</MenuItem>
                                    <MenuItem value="pashto">pashto</MenuItem>
                                    <MenuItem value="persian">persian</MenuItem>
                                    <MenuItem value="polish">polish</MenuItem>
                                    <MenuItem value="portuguese">portuguese</MenuItem>
                                    <MenuItem value="punjabi">punjabi</MenuItem>
                                    <MenuItem value="romanian">romanian</MenuItem>
                                    <MenuItem value="russian">russian</MenuItem>
                                    <MenuItem value="samoan">samoan</MenuItem>
                                    <MenuItem value="scots gaelic">scots gaelic</MenuItem>
                                    <MenuItem value="serbian">serbian</MenuItem>
                                    <MenuItem value="sesotho">sesotho</MenuItem>
                                    <MenuItem value="shona">shona</MenuItem>
                                    <MenuItem value="sindhi">sindhi</MenuItem>
                                    <MenuItem value="sinhala">sinhala</MenuItem>
                                    <MenuItem value="slovak">slovak</MenuItem>
                                    <MenuItem value="slovenian">slovenian</MenuItem>
                                    <MenuItem value="somali">somali</MenuItem>
                                    <MenuItem value="spanish">spanish</MenuItem>
                                    <MenuItem value="sundanese">sundanese</MenuItem>
                                    <MenuItem value="swahili">swahili</MenuItem>
                                    <MenuItem value="swedish">swedish</MenuItem>
                                    <MenuItem value="tajik">tajik</MenuItem>
                                    <MenuItem value="tamil">tamil</MenuItem>
                                    <MenuItem value="telugu">telugu</MenuItem>
                                    <MenuItem value="thai">thai</MenuItem>
                                    <MenuItem value="turkish">turkish</MenuItem>
                                    <MenuItem value="ukrainian">ukrainian</MenuItem>
                                    <MenuItem value="urdu">urdu</MenuItem>
                                    <MenuItem value="uyghur">uyghur</MenuItem>
                                    <MenuItem value="uzbek">uzbek</MenuItem>
                                    <MenuItem value="vietnamese">vietnamese</MenuItem>
                                    <MenuItem value="welsh">welsh</MenuItem>
                                    <MenuItem value="xhosa">xhosa</MenuItem>
                                    <MenuItem value="yiddish">yiddish</MenuItem>
                                    <MenuItem value="yoruba">yoruba</MenuItem>
                                    <MenuItem value="zulu">zulu</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                        </FormControl>

                    </div>

                    <div>
                        <FormControl required sx={{ m: 1, minWidth: 400 }}>
                                <InputLabel id="demo-simple-select-required-label" bgcolor='#000000'><b> Output Language </b></InputLabel>
                                <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={olang}
                                name="outputLang"
                                label="Output Language"
                                onChange={(e)=>handleChange(e)}
                                required 
                                sx={{minHeight:100 , fontSize:25}}
                                >
                                
                                
                                
                                    <MenuItem value="afrikaans">afrikaans</MenuItem>
                                    <MenuItem value="albanian">albanian</MenuItem>
                                    <MenuItem value="amharic">amharic</MenuItem>
                                    <MenuItem value="arabic">arabic</MenuItem>
                                    <MenuItem value="armenian">armenian</MenuItem>
                                    <MenuItem value="azerbaijani">azerbaijani</MenuItem>
                                    <MenuItem value="basque">basque</MenuItem>
                                    <MenuItem value="belarusian">belarusian</MenuItem>
                                    <MenuItem value="bengali">bengali</MenuItem>
                                    <MenuItem value="bosnian">bosnian</MenuItem>
                                    <MenuItem value="bulgarian">bulgarian</MenuItem>
                                    <MenuItem value="catalan">catalan</MenuItem>
                                    <MenuItem value="cebuano">cebuano</MenuItem>
                                    <MenuItem value="chichewa">chinese (simplified)</MenuItem>
                                    <MenuItem value="chichewa">chinese (traditional)</MenuItem>
                                    <MenuItem value="corsican">corsican</MenuItem>
                                    <MenuItem value="croatian">croatian</MenuItem>
                                    <MenuItem value="czech">czech</MenuItem>
                                    <MenuItem value="danish">danish</MenuItem>
                                    <MenuItem value="danish">dutch</MenuItem>
                                    <MenuItem value="english">english</MenuItem>
                                    <MenuItem value="esperanto">esperanto</MenuItem>
                                    <MenuItem value="estonian">estonian</MenuItem>
                                    <MenuItem value="filipino">filipino</MenuItem>
                                    <MenuItem value="finnish">finnish</MenuItem>
                                    <MenuItem value="french">french</MenuItem>
                                    <MenuItem value="frisian">frisian</MenuItem>
                                    <MenuItem value="galician">galician</MenuItem>
                                    <MenuItem value="georgian">georgian</MenuItem>
                                    <MenuItem value="german">german</MenuItem>
                                    <MenuItem value="greek">greek</MenuItem>
                                    <MenuItem value="gujarati">gujarati</MenuItem>
                                    <MenuItem value="haitian creole">haitian creole</MenuItem>
                                    <MenuItem value="hausa">hausa</MenuItem>
                                    <MenuItem value="hawaiian">hawaiian</MenuItem>
                                    <MenuItem value="hebrew">hebrew</MenuItem>
                                    <MenuItem value="hindi">hindi</MenuItem>
                                    <MenuItem value="hmong">hmong</MenuItem>
                                    <MenuItem value="hungarian">hungarian</MenuItem>
                                    <MenuItem value="icelandic">icelandic</MenuItem>
                                    <MenuItem value="igbo">igbo</MenuItem>
                                    <MenuItem value="indonesian">indonesian</MenuItem>
                                    <MenuItem value="irish">irish</MenuItem>
                                    <MenuItem value="italian">italian</MenuItem>
                                    <MenuItem value="japanese">japanese</MenuItem>
                                    <MenuItem value="javanese">javanese</MenuItem>
                                    <MenuItem value="kannada">kannada</MenuItem>
                                    <MenuItem value="kazakh">kazakh</MenuItem>
                                    <MenuItem value="khmer">khmer</MenuItem>
                                    <MenuItem value="korean">korean</MenuItem>
                                    <MenuItem value="kurdish (kurmanji)">kurdish (kurmanji)</MenuItem>
                                    <MenuItem value="kyrgyz">kyrgyz</MenuItem>
                                    <MenuItem value="lao">lao</MenuItem>
                                    <MenuItem value="latin">latin</MenuItem>
                                    <MenuItem value="latvian">latvian</MenuItem>
                                    <MenuItem value="lithuanian">lithuanian</MenuItem>
                                    <MenuItem value="luxembourgish">luxembourgish</MenuItem>
                                    <MenuItem value="macedonian">macedonian</MenuItem>
                                    <MenuItem value="malagasy">malagasy</MenuItem>
                                    <MenuItem value="malay">malay</MenuItem>
                                    <MenuItem value="malayalam">malayalam</MenuItem>
                                    <MenuItem value="maltese">maltese</MenuItem>
                                    <MenuItem value="maori">maori</MenuItem>
                                    <MenuItem value="marathi">marathi</MenuItem>
                                    <MenuItem value="mongolian">mongolian</MenuItem>
                                    <MenuItem value="myanmar">myanmar</MenuItem>
                                    <MenuItem value="nepali">nepali</MenuItem>
                                    <MenuItem value="norwegian">norwegian</MenuItem>
                                    <MenuItem value="odia">odia</MenuItem>
                                    <MenuItem value="pashto">pashto</MenuItem>
                                    <MenuItem value="persian">persian</MenuItem>
                                    <MenuItem value="polish">polish</MenuItem>
                                    <MenuItem value="portuguese">portuguese</MenuItem>
                                    <MenuItem value="punjabi">punjabi</MenuItem>
                                    <MenuItem value="romanian">romanian</MenuItem>
                                    <MenuItem value="russian">russian</MenuItem>
                                    <MenuItem value="samoan">samoan</MenuItem>
                                    <MenuItem value="scots gaelic">scots gaelic</MenuItem>
                                    <MenuItem value="serbian">serbian</MenuItem>
                                    <MenuItem value="sesotho">sesotho</MenuItem>
                                    <MenuItem value="shona">shona</MenuItem>
                                    <MenuItem value="sindhi">sindhi</MenuItem>
                                    <MenuItem value="sinhala">sinhala</MenuItem>
                                    <MenuItem value="slovak">slovak</MenuItem>
                                    <MenuItem value="slovenian">slovenian</MenuItem>
                                    <MenuItem value="somali">somali</MenuItem>
                                    <MenuItem value="spanish">spanish</MenuItem>
                                    <MenuItem value="sundanese">sundanese</MenuItem>
                                    <MenuItem value="swahili">swahili</MenuItem>
                                    <MenuItem value="swedish">swedish</MenuItem>
                                    <MenuItem value="tajik">tajik</MenuItem>
                                    <MenuItem value="tamil">tamil</MenuItem>
                                    <MenuItem value="telugu">telugu</MenuItem>
                                    <MenuItem value="thai">thai</MenuItem>
                                    <MenuItem value="turkish">turkish</MenuItem>
                                    <MenuItem value="ukrainian">ukrainian</MenuItem>
                                    <MenuItem value="urdu">urdu</MenuItem>
                                    <MenuItem value="uyghur">uyghur</MenuItem>
                                    <MenuItem value="uzbek">uzbek</MenuItem>
                                    <MenuItem value="vietnamese">vietnamese</MenuItem>
                                    <MenuItem value="welsh">welsh</MenuItem>
                                    <MenuItem value="xhosa">xhosa</MenuItem>
                                    <MenuItem value="yiddish">yiddish</MenuItem>
                                    <MenuItem value="yoruba">yoruba</MenuItem>
                                    <MenuItem value="zulu">zulu</MenuItem>
                                </Select>
                                
                                <FormHelperText>Required</FormHelperText>
                        </FormControl>

                    </div>
                </Stack>
                
                <Box
                    sx={{
                    boxShadow: 3,
                    width: '700px',
                    height: '20',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    p: 1,
                    m: 1,
                    borderRadius: 5,
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    alignment:'center'
                    }}
                    alignment="center"
                    justifyContent="center"
                    >
  
                    <Input
                        style={{
                        display: "none"
                        }}
                        accept=".json"  // specify the file type that you wanted to accept
                        id="choose-file"
                        type="file"
                        name="audioFile"
                        onChange={(e)=>handleChange(e)}
                        inputProps={{ accept: 'audio/wav, audio/mp3' }}
                    />
                    
                   
                        <label htmlFor="choose-file">
                            <Icon icon="bi:upload" color="blue" width="200" height="200" />
                        </label>
                       

  

                        <Box>
                        <Button variant="outlined" color='success' onClick={(e)=>handleSubmit(e)}>Submit</Button>
                        </Box>
                </Box>
            </Grid>
           
            

            <Grid container direction="row" justifyContent="center" alignment="center" ml={26} my={-5} mr={50}>
            
            <Stack direction="row">


                {/* <Box my={10} >
                    <Button onClick={()=>speechHandler(msg)}>
                        <Icon icon="el:speaker" color="#100" width="60" height="60" />    
                        </Button>
                </Box> */}
            <Stack>
            
            
            
             <Box
                    sx={{
                    boxShadow: 3,
                    width: '700px',
                    height: '20',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    p: 1,
                    m: 1,
                    borderRadius: 5,
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    alignment:'center'
                    }}
                    
                    alignment="center"
                    justifyContent="center"
                    style={{ width: '700px' , height:200}}
                    
                    >
                        
                        <h3>Output:</h3>  
                        <h2>{output}</h2>

{/*                         
                        <TextareaAutosize aria-label="minimum height"
                            minRows={3}
                            placeholder="output::"
                            style={{ width: 500 , height:400}}
                        />    */}
                                    
                        
                        
                        
                        
                    </Box>   
                    <Button variant="contained" sx={{m:1 , minWidth:200}} onClick={downloadTxtFile}>Export File</Button>
                    </Stack> 
                </Stack>  
            </Grid>
            </Grid>
            </Grid>
        </>
    );



}


export default UploadFile;