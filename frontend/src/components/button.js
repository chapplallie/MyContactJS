function Button({ onClick, children }) {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            {children}
        </button>
    );
}

export default Button;