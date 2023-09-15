
import { Grid,Box ,TextField,Button, Switch,MenuItem,FormControl,InputLabel,Select,FormHelperText, Stack, TextareaAutosize} from "@mui/material";
import { Icon } from '@iconify/react';
import { useState } from "react";
import vmsg from "vmsg";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/**local imports */
import { uploadSpeech } from "./services/api";

//alert API
import swal from 'sweetalert';

//import image for background
import Image from "./upload.png";

const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});


const initialValues={
    inputLang:"marathi",
    outputLang:"hindi",
    audioFile:""
    
  };

  

  const blobToFile = async (myBlob, fileName)=>{
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    // theBlob.lastModifiedDate = new Date();
    // theBlob.name = fileName;
    // return theBlob;
    // const blobarr=myBlob.arrayBuffer();
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(blobarr)));
    // console.log(base64String);
    // var uintArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    // var newblob=new Blob([uintArray]) ;
    const blob= myBlob.slice(0, myBlob.size, "audio/wav")
    // console.log(blob);
    const myFile = new File([myBlob], 'test.mp3', {
      type: "audio/wav",
    });

    return myFile;
}

let formblob;


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function Speech()
{

  
  
  
  const [data , setdata] = useState(initialValues);

  /**states for vmsg */
    const [isLoading , setIsLoading]=useState(false);
    const [isRecording ,setIsRecording]=useState(false);
    const [recordings , setRecordings]=useState("");
    const [blobData,setBlobData]=useState();
    const [toggle , settoggle]=useState(true);

    const record=async()=>{
      setIsLoading(true);

      if(isRecording){
        const blob = await recorder.stopRecording();
        formblob=blob;
        console.log(formblob);
        setIsLoading(false);
        setIsRecording(false);
        setRecordings(URL.createObjectURL(blob));
        setDataForce(URL.createObjectURL(blob));
        setBlobData(blobToFile(blob, 'test'));
        
        // localStorage.setItem('audioblob',JSON.stringify(blobData));
       // setdata({...data,'audioFile':recordings})
        // console.log(file);
        console.log(data);
        
      }
      else{
        try{
          await recorder.initAudio();
          await recorder.initWorker();
          recorder.startRecording();
          setIsLoading(false);
          setIsRecording(true);
        }catch(e){
          console.error(e);
          setIsLoading(false);
        }
      }

    }

    
    /**states for rendering */
    const [ilang, setilang] = useState('marathi');

    const [olang, setolang] = useState('hindi');

    //const [data , setdata] = useState(initialValues);
    const [output,setOutput] = useState('');
    
    const {inputLang,outputLang,audioFile}=data;

 
    const handleChange=(e)=>{
        
      setdata({...data,[e.target.name]:e.target.value})
      console.log(recordings);
      // setdata({...data,'audioFile':recordings})
      console.log(data);
      if(e.target.name==='inputLang')
          setilang(e.target.value);
      else
          setolang(e.target.value);
      console.log(e.target.value);
  
          //console.log(data);
    }
    
    const setDataForce = () =>{
      setdata({...data,'audioFile':blobData});
    }

    const handleSwitchChange=(e)=>{
        
      if(toggle === true )
      {
        settoggle(false);
      }
      else
      {
        settoggle(true)
      }
    }

   // const file=blobToFile(recordings,'test');

    const handleSubmit=(e)=>{
        console.log(formblob);
        const formdata=new FormData();
        formdata.append('inputLang',ilang);
        formdata.append('outputLang',olang);
        formdata.append('toggle',toggle);
        formdata.append('file',formblob);

        // const audiodata=JSON.parse(localStorage.getItem('audioblob'));
        e.preventDefault(); //vvvvvvvvvvvvvvvvvvvvvviiiiiiiiiiiiiiiiiiiiiiimmmmmmmmmmmmmmmmmmmmmmmmmmm (very imp)
       setDataForce();
       // console.log(audiodata);
        console.log(data)

        if( audioFile ===''){
          swal("Error ! ", "Please record audio!", "error");
        }
        else{

           // uploadSpeech(data);
           uploadSpeech(formdata).then((res)=>{
                const data=res.data;
                console.log(data.output);
                if(output==='')
                {
                    setOutput(data.output)
                }
                else
                {
                    let append_output=output+"\n"+data.output
                    console.log(append_output)
                    setOutput(append_output)
                }
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

    return(
        <>
        
         {/* <ul style={{ listStyle: "none", padding: 0 }}>
          
            <li key={recordings}>
              <audio src={recordings} controls></audio>
              <h2>{recordings}</h2>
              {}
            </li>
         
        </ul> */}

        <Grid container style={styles.gridContainer} justifyContent="center" alignment="center">

          <Grid>
            <Grid container direction="row" justifyContent="center" alignment="center" my={20} mr={50}>
                <Stack>
                    <div>
                        <FormControl required sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-required-label"><b>Input Language</b></InputLabel>
                                <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={ilang}
                                name="inputLang"
                                label="Input Language *"
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
                        <FormControl required sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-required-label"><b>Output Language</b></InputLabel>
                                <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={olang}
                                name="outputLang"
                                label="Output Language"
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
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Police</Typography>
                            <AntSwitch onChange={handleSwitchChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography>Criminal</Typography>
                          </Stack>
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
  
                    <button disabled={isLoading} onClick={record}>
                      {isRecording ? <Icon icon="fluent:record-stop-12-regular" color="red" width="200" height="200" /> : <Icon icon="fluent:record-32-regular" color="red"  width="200" height="200"  />}
                    </button>

  

                        <Box>
                        <Button variant="outlined" sx={{m:2}} color='success' onClick={(e)=>handleSubmit(e)}>Submit</Button>
                        </Box>
                </Box>
            </Grid>
            
            <Grid container direction="row" justifyContent="center" alignment="center" ml={20} my={-5} mr={50}>
            

            <Stack my={-2}>

             {/* <Box
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
                        <>
                        <h3>Output:</h3>  
                        <h2>{output}</h2>
                        </>

                                    
                        
                        
                        
                        
                    </Box>       */}

              <TextField
                sx={{
                    boxShadow: 3,
                    // width: '700px',
                    // height: '20',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                    p: 1,
                    m: 0,
                    borderRadius: 5,
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    alignment:'center'
                    
                    }}
                    alignment="center"
                    justifyContent="center"
                    style={{ width: 700 , height:250}}
                    multiline
                    rows={8}
                    maxRows={8}
                    value={output}

                    
                />
                   <Button variant="contained" sx={{m:1 , minWidth:200}} onClick={downloadTxtFile}>Export File</Button>
                  </Stack>
            </Grid>
            </Grid>
            </Grid>
        </>
    );



}


export default Speech;