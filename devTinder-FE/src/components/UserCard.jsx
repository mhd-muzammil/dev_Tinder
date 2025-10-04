import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about } = user;

    
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={user.phoroUrl}
                    alt="photo"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                {age && gender && <p>{ age+", "+gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="bg-red-600 p-4 rounded-xl">Ignore</button>
                    <button className="bg-green-600 p-4 rounded-xl">Interested</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;