import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MovieQualityComparison from '@/components/MovieQualityComparison/MovieQualityComparison';
import { moviesEmbed } from '@/data/listFilm';
const WatchPage: React.FC = () => {
  const router = useRouter();
  const { id, media_type } = router.query;

  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id && media_type) {
      console.log('ID:', id);
      console.log('Media Type:', media_type);

      // Tìm linkEmbed từ moviesEmbed
      const movie = moviesEmbed.find(movie => movie.id === Number(id)); // Chuyển đổi id thành số

      if (movie) {
        setEmbedUrl(movie.linkEmbed); // Cập nhật biến embedUrl
      } else {
        console.log('Phim không tìm thấy');
      }
    }
  }, [id, media_type]);

  return (
    <div className="flex items-center flex-col justify-center w-full bg-black pt-[5%]">
    <div className="relative w-full" style={{ aspectRatio: "1850 / 771" }}>
    {embedUrl ? ( // Kiểm tra nếu embedUrl có giá trị
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title="Movie player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-white">Đang tải video...</p> // Hoặc một thông báo khác nếu chưa có embedUrl
        )}
    </div>

    <div className="w-full mt-10">
      <div className="flex flex-col w-full px-4 md:px-[10%] lg:px-[14%] mt-10 ">
        <div className="flex flex-col md:flex-row justify-between items-center 0">
          {/* Tab trái */}
          <div className="flex flex-col text-left gap-4 ">
            <h1 className="text-white text-[20px] md:text-[32px]">
              Deadpool và Wolverine
            </h1>
            <h2 className="text-white text-opacity-70 text-[15px] md:text-[20px]">
              Deadpool & Wolverine (2024)
            </h2>
            <div className="flex flex-wrap gap-8 mt-5">
              <a
                href="#"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12v-9.294H9.293v-3.622H12V8.413c0-2.666 1.627-4.119 4.006-4.119 1.139 0 2.117.084 2.4.122v2.784h-1.647c-1.293 0-1.545.615-1.545 1.518v1.989h3.087l-.402 3.622h-2.685V24h5.269C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
                </svg>
                Chia sẻ
              </a>

              <a
                href="#"
                className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 md:px-6 hover:text-white font-bold py-2 px-4 rounded text-sm md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Bộ sưu tập
              </a>

              <a
                href="#"
                className="flex items-center border border-green-500 text-green-500 hover:bg-green-500 md:px-6 hover:text-white font-bold py-2 px-4 rounded text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h1.5M18 18.375v-1.5m0 1.5c0 .621.504 1.125 1.125 1.125h1.5m-2.625-2.625V9.375m0 0c0-.621.504-1.125 1.125-1.125h1.5m-2.625 0V5.625M6 18.375v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125h-1.5m2.625-2.625V9.375m0 0c0-.621-.504-1.125-1.125-1.125h-1.5m2.625 0V5.625M12 7.5v9"
                    />
                  </svg>
                </svg>
                Phim tương tự
              </a>
            </div>
          </div>
          {/* Tab phải */}
          <div className="flex flex-col h-full items-center justify-evenly gap-4 mt-4 md:mt-0 ">
            <a className="btn-sm border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-round transition duration-300 ease-in-out">
              Tab song ngữ
            </a>
            <a className="flex items-center text-blue-500 hover:text-white">
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l-6-6 6-6" />
                <path d="M20 12H3" />
              </svg>
              <span className=" text-blue-500 hover:text-yellow-400 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                Về trang giới thiệu phim
              </span>
            </a>
          </div>
        </div>

        <div className="text-white text-left text-xl mt-10 flex flex-col gap-10">
          <span>
            A listless Wade Wilson toils away in civilian life with his days
            as the morally flexible mercenary, Deadpool, behind him. But when
            his homeworld faces an existential threat, Wade must reluctantly
            suit-up again with an even more reluctant Wolverine.
          </span>
          <span>
            Bạn cũng có thể upload file phụ đề của riêng bạn =&gt;{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Click vào đây!
            </a>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-md md:text-2xl">Tiếng anh</span>

              <div className="flex flex-row justify-between items-center mt-4 w-[90%] md:w-full">
                <div className="flex flex-row gap-6  w-10/12 md:w-10/12 lg:w-11/12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <span className="text-sm md:text-md lg:text-lg">
                    Monkey.Man.2024.HDCAM.c1nem4.x264-SUNSCREEN
                  </span>
                </div>
                <div className="bg-green-400 flex py-2 w-1/12 md:w-2/12 lg:w-1/12 rounded-lg justify-center items-center">
                  <span className="text-sm">Chọn</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-md md:text-2xl">Tiếng Việt</span>
              <div className="flex flex-row justify-between items-center mt-4 w-[90%] md:w-full">
                <div className="flex flex-row gap-6  w-10/12 md:w-10/12 lg:w-11/12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <span className="text-sm md:text-md lg:text-lg">
                    Monkey.Man.2024.HDCAM.c1nem4.x264-SUNSCREEN
                  </span>
                </div>
                <div className="bg-green-400 flex py-2 w-1/12 md:w-2/12 lg:w-1/12 rounded-lg justify-center items-center">
                  <span className="text-sm">Chọn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <div className="flex flex-col mt-4">
              <span className="text-md md:text-2xl">Bình luận phim</span>
              <textarea
                className="mt-4 w-full h-24 text-black p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Nhập bình luận của bạn..."
                rows={4}
              ></textarea>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Gửi bình luận
              </button>
            </div>

            <div className="flex flex-col">
              <span className="text-md md:text-2xl">Bình luận</span>
              <div className="flex flex-row justify-between items-center mt-4 w-[90%] md:w-full">
                <div className="flex flex-row gap-6  w-10/12 md:w-10/12 lg:w-11/12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <span className="text-sm md:text-md lg:text-lg">
                    Monkey.Man.2024.HDCAM.c1nem4.x264-SUNSCREEN
                  </span>
                </div>
                <div className="bg-green-400 flex py-2 w-1/12 md:w-2/12 lg:w-1/12 rounded-lg justify-center items-center">
                  <span className="text-sm">Chọn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comment */}

          <div className="h-[100px]"></div>

          <MovieQualityComparison />
        </div>

        <div className="h-[200px]"></div>
      </div>
    </div>
  </div>

  );
};

export default WatchPage;
