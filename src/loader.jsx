const Loader = (props) => {
    return (props.data == true) ? <div className="ee-preloader">
        <img src="/assets/images/preloader.svg" alt="" />
    </div> : ""
}
export default Loader; 