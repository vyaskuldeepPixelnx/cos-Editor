import React, { useState, useRef } from 'react'
import { Button, CardHeader, Modal, Card, Form } from 'react-bootstrap';
import { SlActionUndo } from "react-icons/sl";
import { SlActionRedo } from "react-icons/sl";
import { SlLink } from "react-icons/sl";
import { SlRefresh } from "react-icons/sl";
import { FaRegCopy } from "react-icons/fa6";
import { AiOutlineBold } from "react-icons/ai";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineCloudDownload } from "react-icons/md";
import { FaItalic } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import Navbar from '../component/navbar';
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { MdOutlineFormatColorText, MdFormatColorFill,MdOutlineKeyboardArrowDown    } from "react-icons/md";

const textEditor = () => {
  const [dropdownOpen, setdropdownOpen] = useState(false)
  const editorRef = useRef(null);
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };
  const [linkUrl, setLinkUrl] = useState('');
  const [reWriteData, setReWriteData] = useState('');
  console.log("linkUrl", linkUrl)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFontChange = (event) => {
    formatText('fontName', event.target.value);
  };
  const handleFontSizeChange = (event) => {
    formatText('fontSize', event.target.value);
  };
  const changeColor = (data) => {
    formatText('foreColor', data);
    console.log(data)
  }
  const backColor = (data) => {
    formatText('backColor', data);
    console.log(data)
  }

  const download = (type) => {
    let docName = "file"
    console.log(editorRef.current)
    // document.execCommand('selectAll', true)
    const content = window.getSelection({ format: 'html' });
    const html = `
            <html ${type === 'doc' ? 'xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"' : ''}>
            <head>
              <meta charset="utf-8" />
              <title>${docName}</title>
            </head>
            <body>
              ${content}
            </body>
            </html>`;
    const url = `${type === 'doc' ? 'data:application/vnd.ms-word;charset=utf-8' : 'data:text/plain;charset=utf-8'},${encodeURIComponent(html)}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = `${docName}.${type}`;
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };
  const addLink = () => {
    var linkURL = prompt('Enter a URL:', 'http://');
    var sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
  }

  const rewrite = () => {
    const reurl = prompt('Enter the reURL', reWriteData);
    if (reurl) {
      document.execCommand('createLink', "recommendation ");
    }
  }
  const lodingSubmMenu = [
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana"
  ]

  return (
    <>
      <div className=".container-fluid m-0">
        <div className="row m-0 ">
          <div className="col-md-3 ">
            <Navbar></Navbar>
          </div>
          <div className="col-md-9  bg-light">
            <div className="p-4 ps-5">
              <Card className='mt-5' style={{ width: '80rem' }}>
                <CardHeader> Text Editor</CardHeader>
                <div className='m-'>
                  <div className='undo-class'>
                    <div className='' >
                      <Button onMouseDown={(e) => { e.preventDefault(); formatText('undo'); }} variant="outline-secondary" className='m-2'><SlActionUndo /></Button>
                      <Button onMouseDown={(e) => { e.preventDefault(); formatText('redo'); }} variant="outline-secondary" className='m-2'><SlActionRedo /></Button>
                    </div>
                    <div className='Default-r'>
                      <Button variant="outline-secondary" className='m-2' onClick={handleShow} > <SlRefresh /> Regenerate Email</Button>
                      <div className={`${dropdownOpen ? 'ee-editor-dropdown active ' : 'ee-editor-dropdown'}`}>
                        <Button type="button" variant="outline-secondary" onClick={() => setdropdownOpen(!dropdownOpen)} className="border-btn mt-2 download-btn">
                          <MdOutlineCloudDownload className='me-1' />Download <FaChevronDown />
                        </Button>
                        <div className="ee-download-options">
                          <ul>
                            <li><a onClick={() => {
                              download("html")
                              setdropdownOpen(!dropdownOpen)
                            }}>HTML</a></li>
                            <li><a onClick={() => {
                              download("doc")
                              setdropdownOpen(!dropdownOpen)
                            }} >MS Word</a></li>
                          </ul>
                        </div>
                      </div>
                      <Button onMouseDown={(e) => { e.preventDefault(); formatText('copy'); }} variant="outline-secondary" className='m-2' ><FaRegCopy /> Copy </Button>
                      {/* <Button onMouseDown={(e) => { e.preventDefault(); formatText('paste'); }} variant="outline-secondary" className='m-2' ><FaRegCopy /> paste </Button> */}
                      <Button variant="outline-secondary" className='m-2' > <SlRefresh /> Reset</Button>
                    </div>
                  </div>
                  <div className=' Default-r' >
                    <select className='m-2 mt-3 p-0' onChange={handleFontChange}>
                      <option value="Arial">Arial </option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                    <select className='m-2 mt-3 p-0' onChange={handleFontSizeChange}>
                      <option value="12px">12</option>
                      <option value="14px">14</option>
                      <option value="16px">16</option>
                      <option value="18px">18</option>
                      <option value="20px">20</option>
                      <option value="22px">22</option>
                    </select>

                    <label> <MdOutlineFormatColorText className='icon-css' size={30} id="favcolor" /> 
                      <input style={{ 'opacity': '0' }} className=' m-2 mt-3 input-text ' onChange={(e) => { e.preventDefault(), changeColor(e.target.value) }} type="color" id="favcolor" />
                    <MdOutlineKeyboardArrowDown/> 
                    </label>
                    <label> <MdFormatColorFill className='icon-css' size={30} id="favcolor" />
                      <input style={{ 'opacity': '0' }} className='m-2 mt-3 input-text ' onChange={(e) => { e.preventDefault(), backColor(e.target.value) }} type="color" id="favcolor" />
                    <MdOutlineKeyboardArrowDown className='arrow-icon' />
                    </label>

                    {/* <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); rewrite(); }} variant="outline-secondary"><BiEditAlt /> Rewrite</Button> */}
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); addLink(); }} variant="outline-secondary" ><SlLink /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('bold'); }} variant="outline-secondary" ><AiOutlineBold /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('italic'); }} variant="outline-secondary" ><FaItalic /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('underline'); }} variant="outline-secondary" ><MdOutlineFormatUnderlined /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('justifyCenter'); }} variant="outline-secondary" ><FaAlignCenter /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('justifyFull'); }} variant="outline-secondary" ><FaAlignLeft /></Button>
                    <Button className='m-2 mt-3' onMouseDown={(e) => { e.preventDefault(); formatText('justifyRight'); }} variant="outline-secondary" ><FaAlignRight /></Button>
                  </div>
                  <div
                    ref={editorRef}
                    className="editor"
                    contentEditable
                    suppressContentEditableWarning={true}
                    style={{ border: '1px solid black', minHeight: '400px', padding: '10px' }}
                  >
                    Start editing...
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body >
          <Modal.Title>Regenerate</Modal.Title>
          <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label> How would you like to regenerate?</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Button className='m-3 mt-0' variant="primary" onClick={handleClose}>
          Regenerate
        </Button>
      </Modal>
    </>
  )
}

export default textEditor;
