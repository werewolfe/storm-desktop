import PropTypes from 'prop-types';
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import StormContext from '../../context/Storm.context';
// import { downloadTorrent } from '../../services/torrents';
import { seedFile } from '../../services/torrents';
import Loading from '../Loading/Loading';
import {
  Dialog,
  DialogContent,
  Form,
  Title,
  Subtitle,
  InputContainer,
  SelectFolderContainer,
  SelectFolderInput,
  FolderIcon,
  DownloadButton,
  LoadingContainer,
  SnackBar,
} from './AddSeedModal.styles';

const AddSeedModal = ({ setIsSeedDialogOpen }) => {
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [viewFile, setViewFile] = useState("");
  const dialogRef = useRef(null);

  const sendForm = async (e) => {
    e.preventDefault();
    const res = await seedFile(file);
    if (res.status === 'error') {
      setError(res.message);
    } else {
      console.log(res)
      setIsSeedDialogOpen(false);
    }
  };

  const onUploadFile = async (e) => {
    console.log(e.target.files[0])
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setViewFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsSeedDialogOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dialogRef]);

  return (
    <Dialog>
      <DialogContent ref={dialogRef}>
        <Form onSubmit={sendForm}>
          <Title>Add new torrent</Title>
          <Subtitle>
            Paste a torrent hash, magnet URI or HTTP link and Storm will
            make the rest for you.
          </Subtitle>
          <InputContainer>
            <SelectFolderContainer>
              { !file &&
                <FolderIcon />
              } : {
                <img width={35} src={viewFile}/>
              }
            </SelectFolderContainer>
            <SelectFolderInput
              type="file"
              name='image'
              onChange={(e) => onUploadFile(e)}
              placeholder="Upload Local File"
              readOnly
              view="hidden"
              value=""
            />
          </InputContainer>
          <DownloadButton type="submit" value="Start Seeding File" disabled={!file} />
        </Form>
      </DialogContent>
      {error && (
        <SnackBar>
          {error}
        </SnackBar>
      )}
    </Dialog>
  );
};

AddSeedModal.propTypes = {
  setIsSeedDialogOpen: PropTypes.func.isRequired,
};

export default AddSeedModal;