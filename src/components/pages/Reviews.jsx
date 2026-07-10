import React, { useState } from 'react';
import PageHeader from '../PageHeader';

const ratingBreakdown = [
    { stars: '5★', pct: 92, color: '#D61CA8' },
    { stars: '4★', pct: 6, color: '#8B2EF5' },
    { stars: '3★', pct: 1, color: '#F59E0B' },
    { stars: '2★', pct: 1, color: '#EF4444' },
    { stars: '1★', pct: 0, color: '#EF4444' },
];

const initialReviews = [
    {
        id: 1,
        name: 'Ahmed Al-Rashdi',
        initial: 'A',
        service: 'AC Deep Cleaning',
        date: 'Today',
        rating: 5,
        text: '"Mohammed arrived on time and did a thorough job. AC working perfectly!"',
        reply: null,
    },
    {
        id: 2,
        name: 'Fatima Al-Balushi',
        initial: 'F',
        service: 'AC Repair',
        date: 'Yesterday',
        rating: 5,
        text: '"Very professional, diagnosed the issue quickly and fixed it on the spot."',
        reply: 'Thank you so much! Looking forward to serving you again.',
    },
    {
        id: 3,
        name: 'Khalid Al-Farsi',
        initial: 'K',
        service: 'Electrical Repair',
        date: '8 Jul',
        rating: 4,
        text: '"Good service. Slight delay getting parts but was communicative."',
        reply: null,
    },
    {
        id: 4,
        name: 'Sara Al-Maamari',
        initial: 'S',
        service: 'AC Deep Cleaning',
        date: '7 Jul',
        rating: 5,
        text: '"Excellent! Would book again. Very clean and professional."',
        reply: 'Thank you so much! Looking forward to serving you again.',
    },
];

const Stars = ({ count }) => (
    <span className="text-[#F59E0B] text-xs">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</span>
);

const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [replyingId, setReplyingId] = useState(null);
    const [draft, setDraft] = useState('');

    const startReply = (id) => {
        setReplyingId(id);
        setDraft('');
    };

    const submitReply = (id) => {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, reply: draft || r.reply } : r)));
        setReplyingId(null);
    };

    return (
        // <div className="flex-1 overflow-y-auto flex flex-col bg-[#F8F8FA]">
        //   <PageHeader title="My Reviews" subtitle="847 total reviews · All from verified bookings" />
        <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
            {/* Title Section matching Credits layout */}
            <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">My Reviews</div>
            <div className="text-[14px] text-[#9090A0] mb-[20px]">
                847 total reviews · All from verified bookings
            </div>


            <div className="p-6">
                {/* Filters */}
                <div className="flex justify-end gap-2 mb-4">
                    <button className="px-3 py-1.5 bg-white border border-[#EBEBEF] rounded-lg font-medium text-[10px] leading-none text-[#6B7280] hover:border-[#D61CA8] transition-colors">
                        Service ▾
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-[#EBEBEF] rounded-lg font-medium text-[10px] leading-none text-[#6B7280] hover:border-[#D61CA8] transition-colors">
                        Rating ▾
                    </button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-[180px_1fr] gap-3 mb-5">
                    <div className="bg-white rounded-2xl p-4 shadow-[0_1px_5px_rgba(0,0,0,0.05)] text-center">
                        <div className="font-extrabold text-5xl leading-none text-[#0A0A0F]">4.9</div>
                        <div className="text-[#F59E0B] text-lg my-1.5">★★★★★</div>
                        <div className="font-normal text-[10px] leading-none text-[#9090A0]">847 reviews</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
                        {ratingBreakdown.map((row) => (
                            <div key={row.stars} className="flex items-center gap-2 mb-1.5 last:mb-0">
                                <span className="font-medium text-[11px] leading-none text-[#6B7280] w-6 flex-shrink-0">{row.stars}</span>
                                <div className="flex-1 h-1.5 bg-[#F0F0F4] rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                                </div>
                                <span className="font-bold text-[10px] leading-none text-[#0A0A0F] w-7 text-right">{row.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review list */}
                <div className="flex flex-col gap-2.5">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                                        {review.initial}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[11px] leading-none text-[#0A0A0F]">{review.name}</div>
                                        <div className="font-normal text-[9px] leading-none text-[#9090A0] mt-0.5">
                                            {review.service} · {review.date}
                                        </div>
                                    </div>
                                </div>
                                <Stars count={review.rating} />
                            </div>
                            <div className="font-normal text-[11px] leading-relaxed text-[#555] mb-2">{review.text}</div>

                            {review.reply ? (
                                <div className="bg-[#F0FDF4] rounded-lg px-2.5 py-1.5 font-normal text-[10px] leading-snug text-[#059669]">
                                    ↩ Your reply: {review.reply}
                                </div>
                            ) : replyingId === review.id ? (
                                <div className="flex flex-col gap-2">
                                    <textarea
                                        value={draft}
                                        onChange={(e) => setDraft(e.target.value)}
                                        placeholder="Write a reply…"
                                        className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-lg px-2.5 py-2 font-normal text-[11px] text-[#0A0A0F] outline-none focus:border-[#D61CA8] transition-colors resize-none"
                                        rows={2}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => submitReply(review.id)}
                                            className="px-3 py-1.5 bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-md font-semibold text-[10px] leading-none text-white"
                                        >
                                            Post Reply
                                        </button>
                                        <button
                                            onClick={() => setReplyingId(null)}
                                            className="px-3 py-1.5 bg-[#F8F8FA] border border-[#EBEBEF] rounded-md font-semibold text-[10px] leading-none text-[#6B7280]"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => startReply(review.id)}
                                    className="inline-block px-2.5 py-1.5 bg-[#F8F8FA] border border-[#EBEBEF] rounded-md font-semibold text-[10px] leading-none text-[#555] hover:border-[#D61CA8] hover:text-[#D61CA8] transition-colors"
                                >
                                    Reply to Review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;