const MovieQualityComparison = () => {
    return (
      <div className="w-full flex flex-col text-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex flex-col mb-4">
          <span className="text-lg md:text-xl text-white">
            Phim chất lượng cao online của MeU-Streaming khác gì so với các trang phim khác?
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất.
            </li>
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải).
            </li>
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube).
            </li>
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao.
            </li>
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online.
            </li>
            <li className="text-base md:text-lg lg:text-xl text-gray-400">
              Có lựa chọn hiện phụ đề song ngữ (thực hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề phim.
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default MovieQualityComparison;
  