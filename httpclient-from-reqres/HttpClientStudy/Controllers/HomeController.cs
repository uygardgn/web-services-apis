using HttpClientStudy.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace HttpClientStudy.Controllers
{
    public class HomeController : Controller
    {
        private readonly string serviceAddress = "https://reqres.in/api/users";

        public async Task<IActionResult> Index(List<UserDTO> list)
        {
            if (list.Any())
            {
                return View(list);
            }

            HttpClient client = new HttpClient();

            string strJson = await client.GetStringAsync(serviceAddress + "?page=1");
            
            var obj = JsonConvert.DeserializeAnonymousType(strJson, new { data = new List<UserDTO>() });

            return View(obj.data);
        }
            
        public async Task<IActionResult> Pages(int rank)
        {
            HttpClient client = new HttpClient();

            string strJson = await client.GetStringAsync(serviceAddress + "?page=" + rank);

            var obj = JsonConvert.DeserializeAnonymousType(strJson, new { data = new List<UserDTO>() });

            return View("Index", obj.data);
        }

        public async Task<IActionResult> Search(string id)
        {
            List<UserDTO> list = new List<UserDTO>();
            HttpClient client = new HttpClient();

            string strJson = await client.GetStringAsync(serviceAddress + "/" + id);

            var obj = JsonConvert.DeserializeAnonymousType(strJson, new { data = new UserDTO() });

            list.Add(obj.data);

            return View("Index", list);
        }

        [HttpPost]
        public IActionResult Create(CreateDTO createDTO)
        {
            HttpClient client = new HttpClient();

            var result = client.PostAsJsonAsync(serviceAddress, createDTO).Result;

            string status = result.StatusCode.ToString();

            return Content(status);
        }
    }
}