export const response = (data, res, status = 200) => {
    const responseData = {
        status,
        data,
    };

    res.status(responseData.status)
    res.json(responseData);
    res.end();
} 